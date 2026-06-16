---
name: "loracon-external-integrations"
description: "Guidelines for bridging LoraCon with external VPN providers like NordVPN or ExpressVPN."
---

# LoraCon Connectivity Bridge

## Concept
LoraCon can act as an orchestration layer on top of existing VPN providers, allowing users to aggregate their subscriptions into a single LoraCon interface.

## Integration Methods
- **SOCKS5/HTTP Forwarding**: Tunneling LoraCon traffic through a NordVPN relay.
- **Config Importing**: Programmatically parsing `.ovpn` or `.conf` files from other providers.
- **Multi-Hop Strategy**: User -> LoraCon Sentinel -> NordVPN Node -> Internet.

## UI Requirements
- Display the underlying provider's logo in the session telemetry.
- provide simple "Bridge Mode" toggles.
