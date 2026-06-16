---
name: "loracon-protocol-standards"
description: "Technical requirements for implementing LoraCon tunneling and security features."
---

# LoraCon Protocol & Security Standards

Implementation rules for the core LoraCon tunneling logic.

## Security Mandates

*   **Encryption**: All packets must be encapsulated using **AES-256-GCM** or **ChaCha20-Poly1305**.
*   **Handshake**: Use **Curve25519** for ephemeral key exchange. Keys must be rotated every 15 minutes.
*   **Obfuscation**: Implement "Noise Injection" to wrap VPN headers in synthetic entropy.
*   **Solana Verification**: Privilege upgrades and node access must be verified against the **Solana Devnet** transaction ledger.

## Interaction Patterns

*   **Connection Lifecycle**: 
    1.  `INITIATING HANDSHAKE`: User triggers tunnel.
    2.  `EXCHANGING KEYS`: Asynchronous key derivation.
    3.  `TUNNEL ESTABLISHED`: Connectivity active.
*   **Telemetry**: Always provide real-time Downlink/Uplink stats and Node Latency metrics in the UI.

## File References (Android)
- `VpnViewModel.kt`: Handles the connection state and timer.
- `LoraconVpnService.kt`: (To be implemented) Core Android VPN service.
