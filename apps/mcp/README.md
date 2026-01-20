# Servidor MCP Básico (HTTP)

Este es un servidor básico de Model Context Protocol (MCP) implementado con `@modelcontextprotocol/sdk` usando transporte HTTP con Server-Sent Events (SSE).

## Descripción

El servidor proporciona dos herramientas de ejemplo:

### 1. Calculator (Calculadora)
Realiza operaciones matemáticas básicas.

**Parámetros:**
- `operation`: Tipo de operación (`add`, `subtract`, `multiply`, `divide`)
- `a`: Primer número
- `b`: Segundo número

**Ejemplo de uso:**
```json
{
  "operation": "add",
  "a": 5,
  "b": 3
}
```

### 2. Greeting (Saludo)
Genera un saludo personalizado en diferentes idiomas.

**Parámetros:**
- `name`: Nombre de la persona a saludar
- `language`: Idioma del saludo (`es`, `en`, `fr`) - opcional, por defecto `es`

**Ejemplo de uso:**
```json
{
  "name": "Arturo",
  "language": "es"
}
```

## Instalación

Primero, instala las dependencias:

```bash
npm install
```

## Ejecución

Para ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3002` por defecto. Puedes cambiar el puerto usando la variable de entorno `PORT`:

```bash
PORT=8080 npm run dev
```

## Endpoints Disponibles

### Health Check
```
GET http://localhost:3002/health
```

Retorna el estado del servidor:
```json
{
  "status": "ok",
  "server": "MCP Server",
  "version": "0.1.0"
}
```

### SSE Endpoint (MCP)
```
GET http://localhost:3002/sse
```

Endpoint para establecer conexión SSE con el servidor MCP.

### Message Endpoint
```
POST http://localhost:3002/message
```

Endpoint para enviar mensajes al servidor MCP.

## Uso con Cliente MCP

Para conectarte a este servidor desde un cliente MCP, usa la URL del endpoint SSE:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const transport = new SSEClientTransport(
  new URL("http://localhost:3002/sse")
);

const client = new Client({
  name: "my-client",
  version: "1.0.0"
}, {
  capabilities: {}
});

await client.connect(transport);
```

## Estructura del Código

- **Validación de esquemas**: Usa Zod para validar los argumentos de entrada
- **Manejo de errores**: Captura y reporta errores de validación y ejecución
- **Transporte HTTP/SSE**: Usa Server-Sent Events para comunicación MCP
- **Express**: Servidor HTTP con middleware CORS
- **Herramientas registradas**: Implementa los handlers necesarios para listar y ejecutar herramientas

## Desarrollo

Para agregar nuevas herramientas:

1. Define el esquema de validación con Zod
2. Agrega la herramienta en el handler `ListToolsRequestSchema`
3. Implementa la lógica en el handler `CallToolRequestSchema`

## Tecnologías Utilizadas

- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk) - SDK oficial de MCP
- [Express](https://expressjs.com/) - Framework web para Node.js
- [CORS](https://www.npmjs.com/package/cors) - Middleware para habilitar CORS
- [Zod](https://zod.dev/) - Validación de esquemas TypeScript-first
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [tsx](https://github.com/esbuild-kit/tsx) - Ejecución de TypeScript

