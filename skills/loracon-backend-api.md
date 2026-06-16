---
name: "loracon-backend-api"
description: "Architecture for the LoraCon Node.js orchestration layer."
---

# LoraCon Orchestration API

## Tech Stack
- **Node.js (Express/Fastify)**: Primary gateway.
- **Redis**: For real-time node telemetry and session caching.
- **PostgreSQL (Prisma)**: For persistent user configuration.

## REST Endpoints
- `GET /api/nodes`: Returns active cluster data.
- `POST /api/auth/register`: Decentralized identity issuance.
- `GET /api/telemetry`: Real-time bandwidth and load metrics.

## Security
- Rate limiting on all handshake endpoints.
- JWT-based authentication with high-entropy secrets.
