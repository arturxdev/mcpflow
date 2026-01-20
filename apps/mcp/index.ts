import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js';
import { boardService } from '@repo/core'
import { taskService } from '@repo/core'
import { z } from "zod";
import type { Request, Response } from 'express';

const getServer = () => {

    const server = new McpServer({
        name: "zenmcp",
        version: "0.1.0",
    });

    server.registerTool(
        'list_boards',
        {
            title: 'List Boards',
            description: 'Lista todos los boards del usuario',
            inputSchema: {
                userId: z.string().describe('ID del usuario')
            }
        },
        async ({ userId }) => {
            try {
                console.log('list_boards')
                const boards = await boardService.getAll(userId)

                const boardList = boards
                    .map((b: any) => `- ${b.name} (${b.id})`)
                    .join('\n')

                return {
                    content: [{
                        type: 'text',
                        text: boards.length
                            ? `📋 Boards:\n${boardList}`
                            : '📋 No hay boards'
                    }]
                }
            } catch (error) {
                return {
                    content: [{ type: 'text', text: `❌ Error: ${String(error)}` }]
                }
            }
        }
    )
    server.registerTool(
        'list_tasks',
        {
            title: 'List Tasks',
            description: 'Lista todas las tareas de un board específico',
            inputSchema: {
                boardId: z.string().describe('ID del board')
            }
        },
        async ({ boardId }) => {
            try {
                const tasks = await taskService.getAll(boardId)

                const grouped = {
                    todo: tasks.filter((t: any) => t.status === 'todo'),
                    doing: tasks.filter((t: any) => t.status === 'doing'),
                    done: tasks.filter((t: any) => t.status === 'done')
                }

                const formatTasks = (list: any[]) =>
                    list.length
                        ? list.map((t: any) => `  - [${t.priority}] ${t.title} (${t.id}) ${t.description}`).join('\n')
                        : '  (vacío)'

                const output = `📋 Tareas del board ${boardId}:

📌 TODO:
${formatTasks(grouped.todo)}

🔄 DOING:
${formatTasks(grouped.doing)}

✅ DONE:
${formatTasks(grouped.done)}`

                return {
                    content: [{ type: 'text', text: output }]
                }
            } catch (error) {
                return {
                    content: [{ type: 'text', text: `❌ Error: ${String(error)}` }]
                }
            }
        }
    )
    server.registerTool(
        'create_task',
        {
            title: 'Create Task',
            description: 'Crea una nueva tarea en la columna Todo de un board',
            inputSchema: {
                boardId: z.string().describe('ID del board'),
                title: z.string().max(120).describe('Título de la tarea (máx 120 caracteres)'),
                priority: z.enum(['low', 'medium', 'high']).describe('Prioridad de la tarea'),
                description: z.string().optional().describe('Descripción en markdown (opcional)'),
                userId: z.string().describe('ID del usuario')
            }
        },
        async ({ boardId, title, priority, description, userId }) => {
            try {

                const task = await taskService.create({
                    title,
                    priority,
                    description: description || '',
                    status: 'todo',
                    boardId,
                    userId
                })
                const text = `📋 Tarea ${task.id}: ${task.title}`
                return {
                    content: [{ type: 'text', text }]
                }
            } catch (error) {
                return {
                    content: [{ type: 'text', text: `❌ Error: ${String(error)}` }]
                }
            }
        }
    )
    server.registerTool(
        'update_task',
        {
            title: 'Update Task',
            description: 'Update a task',
            inputSchema: {
                boardId: z.string().describe('ID del board'),
                taskId: z.string().describe('ID de la tarea'),
                title: z.string().max(120).describe('Título de la tarea (máx 120 caracteres)'),
                priority: z.enum(['low', 'medium', 'high']).describe('Prioridad de la tarea'),
                description: z.string().optional().describe('Descripción en markdown (opcional)')
            }
        },
        async ({ boardId, taskId, title, priority, description }) => {
            try {
                const task = await taskService.getById(taskId, boardId)

                if (!task) {
                    throw new Error('Tarea no encontrada')
                }

                task.title = title
                task.priority = priority
                task.description = description || ''
                await taskService.update(taskId, boardId, task)

                return {
                    content: [{ type: 'text', text: `✅ Tarea actualizada: "${task.title}" (${task.id})` }]
                }
            } catch (error) {
                return {
                    content: [{ type: 'text', text: `❌ Error: ${String(error)}` }]
                }
            }
        }
    )
    server.registerTool('list_task_by_id', {
        title: 'List Task by ID',
        description: 'List a task by ID',
        inputSchema: {
            boardId: z.string().describe('ID del board'),
            taskId: z.string().describe('ID de la tarea')
        }
    }, async ({ boardId, taskId }) => {
        try {
            const task = await taskService.getById(taskId, boardId)
            return {
                content: [{ type: 'text', text: `📋 Tarea ${taskId}: ${task?.title} ${task?.description}` }]
            }
        } catch (error) {
            return {
                content: [{ type: 'text', text: `❌ Error: ${String(error)}` }]
            }
        }
    })
    server.registerTool(
        'move_task',
        {
            title: 'Move Task',
            description: 'Move a task to another column (todo, doing, done)',
            inputSchema: {
                boardId: z.string().describe('ID del board'),
                taskId: z.string().describe('ID de la tarea'),
                status: z.enum(['todo', 'doing', 'done']).describe('Nueva columna')
            }
        },
        async ({ boardId, taskId, status }) => {
            try {
                const task = await taskService.getById(taskId, boardId)

                if (!task) {
                    throw new Error('Tarea no encontrada')
                }

                task.status = status
                await taskService.update(taskId, boardId, task)

                return {
                    content: [{ type: 'text', text: `✅ Tarea ${taskId} movida a "${status}"` }]
                }
            } catch (error) {
                return {
                    content: [{ type: 'text', text: `❌ Error: ${String(error)}` }]
                }
            }
        }
    )
    server.registerTool(
        'delete_task',
        {
            title: 'Delete Task',
            description: 'Delete a task from a board',
            inputSchema: {
                boardId: z.string().describe('ID del board'),
                taskId: z.string().describe('ID de la tarea')
            }
        },
        async ({ boardId, taskId }) => {
            try {
                const task = await taskService.getById(taskId, boardId)

                if (!task) {
                    throw new Error('Tarea no encontrada')
                }

                await taskService.delete(taskId, boardId)

                return {
                    content: [{ type: 'text', text: `✅ Tarea ${taskId} eliminada` }]
                }
            } catch (error) {
                return {
                    content: [{ type: 'text', text: `❌ Error: ${String(error)}` }]
                }
            }
        }
    )

    return server;
}

const app = createMcpExpressApp();

app.post('/mcp', async (req: Request, res: Response) => {
    const server = getServer();
    try {
        const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: undefined
        });
        await server.connect(transport);
        await transport.handleRequest(req, res, req.body);
        res.on('close', () => {
            console.log('Request closed');
            transport.close();
            server.close();
        });
    } catch (error) {
        console.error('Error handling MCP request:', error);
        if (!res.headersSent) {
            res.status(500).json({
                jsonrpc: '2.0',
                error: {
                    code: -32603,
                    message: 'Internal server error'
                },
                id: null
            });
        }
    }
});

app.get('/mcp', async (req: Request, res: Response) => {
    console.log('Received GET MCP request');
    res.writeHead(405).end(
        JSON.stringify({
            jsonrpc: '2.0',
            error: {
                code: -32000,
                message: 'Method not allowed.'
            },
            id: null
        })
    );
});

app.delete('/mcp', async (req: Request, res: Response) => {
    console.log('Received DELETE MCP request');
    res.writeHead(405).end(
        JSON.stringify({
            jsonrpc: '2.0',
            error: {
                code: -32000,
                message: 'Method not allowed.'
            },
            id: null
        })
    );
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`MCP Stateless Streamable HTTP Server listening on port ${PORT}`);
});

// Handle server shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    process.exit(0);
});