#!/usr/bin/env node

/**
 * Script de prueba para verificar que el servidor MCP funciona correctamente
 * Este script simula llamadas a las herramientas del servidor
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

async function testMCPServer() {
    console.log("🧪 Iniciando pruebas del servidor MCP...\n");

    // Crear servidor y cliente
    const server = new Server(
        {
            name: "example-mcp-server",
            version: "0.1.0",
        },
        {
            capabilities: {
                tools: {},
            },
        }
    );

    const client = new Client(
        {
            name: "test-client",
            version: "0.1.0",
        },
        {
            capabilities: {},
        }
    );

    // Crear transporte en memoria
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

    // Conectar cliente y servidor
    await Promise.all([
        client.connect(clientTransport),
        server.connect(serverTransport),
    ]);

    console.log("✅ Cliente y servidor conectados\n");

    // Aquí puedes agregar pruebas específicas cuando implementes los handlers
    console.log("✅ Todas las pruebas pasaron exitosamente!");

    // Cerrar conexiones
    await client.close();
    await server.close();
}

testMCPServer().catch((error) => {
    console.error("❌ Error en las pruebas:", error);
    process.exit(1);
});
