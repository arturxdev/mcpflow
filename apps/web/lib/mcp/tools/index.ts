// lib/mcp/tools/index.ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export function registerTools(server: McpServer) {

  // CREATE TASK
  server.registerTool(
    'create_task',
    {
      title: 'Create Task',
      description: 'Crea una nueva tarea en la columna Todo de un board',
      inputSchema: {
        boardId: z.string().describe('ID del board'),
        title: z.string().max(120).describe('Título de la tarea (máx 120 caracteres)'),
        priority: z.enum(['low', 'medium', 'high']).describe('Prioridad de la tarea'),
        description: z.string().optional().describe('Descripción en markdown (opcional)')
      },
      outputSchema: {
        success: z.boolean(),
        task: z.object({
          id: z.string(),
          title: z.string(),
          priority: z.string(),
          status: z.string()
        }).optional(),
        error: z.string().optional()
      }
    },
    async ({ boardId, title, priority, description }) => {
      try {
        const response = await fetch(`${BASE_URL}/api/boards/${boardId}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            priority,
            description: description || '',
            status: 'todo'
          })
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const task = await response.json()
        const output = { success: true, task }

        return {
          content: [{ type: 'text', text: JSON.stringify(output) }],
          structuredContent: output
        }
      } catch (error) {
        const output = { success: false, error: String(error) }
        return {
          content: [{ type: 'text', text: JSON.stringify(output) }],
          structuredContent: output
        }
      }
    }
  )

  // MOVE TASK
  server.registerTool(
    'move_task',
    {
      title: 'Move Task',
      description: 'Mueve una tarea a otra columna',
      inputSchema: {
        boardId: z.string().describe('ID del board'),
        taskId: z.string().describe('ID de la tarea'),
        status: z.enum(['todo', 'doing', 'done']).describe('Nueva columna')
      },
      outputSchema: {
        success: z.boolean(),
        error: z.string().optional()
      }
    },
    async ({ boardId, taskId, status }) => {
      try {
        const response = await fetch(`${BASE_URL}/api/boards/${boardId}/tasks/${taskId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const output = { success: true }
        return {
          content: [{ type: 'text', text: JSON.stringify(output) }],
          structuredContent: output
        }
      } catch (error) {
        const output = { success: false, error: String(error) }
        return {
          content: [{ type: 'text', text: JSON.stringify(output) }],
          structuredContent: output
        }
      }
    }
  )

  // DELETE TASK
  server.registerTool(
    'delete_task',
    {
      title: 'Delete Task',
      description: 'Elimina una tarea de un board',
      inputSchema: {
        boardId: z.string().describe('ID del board'),
        taskId: z.string().describe('ID de la tarea')
      },
      outputSchema: {
        success: z.boolean(),
        error: z.string().optional()
      }
    },
    async ({ boardId, taskId }) => {
      try {
        const response = await fetch(`${BASE_URL}/api/boards/${boardId}/tasks/${taskId}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const output = { success: true }
        return {
          content: [{ type: 'text', text: JSON.stringify(output) }],
          structuredContent: output
        }
      } catch (error) {
        const output = { success: false, error: String(error) }
        return {
          content: [{ type: 'text', text: JSON.stringify(output) }],
          structuredContent: output
        }
      }
    }
  )
}
