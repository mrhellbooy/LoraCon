---
name: "loracon-android-vpn"
description: "Guidelines for implementing the Android VpnService and WireGuard core."
---

# LoraCon Android VPN Implementation

## Architectural Components
- `VpnService`: The core Android component for intercepting packet flow.
- `TunInterface`: Managing the virtual network interface.
- `WireGuard-Android`: Using the native libwg library for performance.

## Security Best Practices
- **Always-on VPN**: Instruct users on how to enable system-level lockdown.
- **App Filtering**: Allow users to exclude banking or local apps from the tunnel.
- **Kill-Switch**: Implement a hard-drop logic if the VPN process crashes.

## UI Integration
- Use the `LorapokLarvaLogo` for the connection status.
- Primary CTA should be a large, accessible "INITIATE TUNNEL" button.
