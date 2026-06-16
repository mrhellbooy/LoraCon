---
name: "loracon-package-arch"
description: "Rules for distributing LoraCon SDKs across NPM, PIP, and Composer."
---

# LoraCon SDK & Package Architecture

## Goal
To allow developers to programmatically initiate secure tunnels within their own applications.

## Package Guidelines
- **NPM**: `@loracon/core` - Ideal for Electron and Node.js backends.
- **PIP**: `loracon-python` - For data scientists needing anonymous scraping.
- **Composer**: `loracon/php` - For legacy system hardening.

## Core API Methods
- `loracon.init({ key: '...' })`
- `loracon.connect(node_id)`
- `loracon.getStatus()`
