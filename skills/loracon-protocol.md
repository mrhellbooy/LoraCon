# LoraCon Multi-Chain Billing & Protocol Guidelines (loracon-protocol)

This guide documents the decentralized payment flows and multi-chain settlement structures of LoraCon.

---

## 💳 Settlement Infrastructure
LoraCon supports decentralized payments across multiple chains to ensure privacy and trust-less settlement.

### Supported Networks
1.  **Solana Network**: Settlement via Native SOL, USDC, USDT, and utility tokens.
2.  **Binance Smart Chain (BSC)**: Settlement via BNB, USDT, USDC, and CAKE.

---

## 🔐 Payment Handshake Lifecycle
1.  **Checkout Initialization**: Users click on a "Secure Subscription" trigger from pricing cards, prompting the `CheckoutModal`.
2.  **Wallet Linkage**: Supports web3 injection (Phantom / Binance Wallet simulation). State variables track connection address formatting (e.g. `6xP...j7vV`).
3.  **Direct Escrow Transfer**: Instructs users to send subscription values to the LoraCon cold escrow deposit arrays.
4.  **Transaction Verification**:
    -   *Hash Submission*: Users enter their transaction signatures/hashes.
    -   *Admin Verification*: Super-admins view pending hashes via the Admin Panel and cross-examine them on block explorers before issuing the encrypted VPN Privilege Keys.
