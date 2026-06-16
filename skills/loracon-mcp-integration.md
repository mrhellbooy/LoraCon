---
name: "loracon-mcp-integration"
description: "Instructions for building the LoraCon MCP (Model Context Protocol) server."
---

# LoraCon & AI Agency (MCP)

## Definition
The LoraCon MCP server allows LLMs (Gemini, Claude, Grok) to interact with and manage the LoraCon network.

## Capabilities for AI Agents
- `list_nodes`: Agent can find the lowest latency node.
- `deploy_ephemeral_tunnel`: Agent can create a temporary footprint for a task.
- `rotate_keys`: Agent can proactively manage security.

## Transport
- Use JSON-RPC over Standard I/O or WebSockets.
