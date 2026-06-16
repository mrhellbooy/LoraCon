---
name: "loracon-crypto-finance"
description: "Guidelines for Solana-based payments and subscription management."
---

# LoraCon Decentralized Finance

## Payment Flow
1.  **Selection**: User picks a tier (Standard/Premium).
2.  **Transaction**: Wallet (Phantom, Solflare) signs a transfer of SOL/USDT.
3.  **Validation**: LoraCon backend verifies the `tx_hash` on the Solana blockchain.
4.  **Provisioning**: API key is signed with the user's public key.

## Smart Contract Integration
- Maintain a registry of "Privilege Keys" on-chain for total transparency.
- Implement a burn mechanism for platform utility tokens.
