// lib/mcp/server.ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { registerTools } from './tools'

let serverInstance: McpServer | null = null

export function getMcpServer() {
  if (!serverInstance) {
    serverInstance = new McpServer({
      name: 'kanban-mcp',
      version: '1.0.0'
    })
    registerTools(serverInstance)
  }
  return serverInstance
}

export function createMcpServer() {
  const server = new McpServer({
    name: 'kanban-mcp',
    version: '1.0.0'
  })
  registerTools(server)
  return server
}
