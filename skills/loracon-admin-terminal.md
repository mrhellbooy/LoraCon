# LoraCon Admin Terminal & Central Orchestration (loracon-admin-terminal)

This guide outlines developer patterns for building real-time telemetry systems, recursive polling engines, and administrative console interfaces.

---

## 🛰️ Persistent Polling Engine
To prevent thread starvation and request stacking under high network lag, **never use standard setInterval**. Always use recursive `setTimeout` callbacks!

### Core Pattern
```javascript
useEffect(() => {
  let active = true;
  
  async function poll() {
    if (!active) return;
    try {
      await fetchTelemetryData();
    } catch (e) {
      console.error("Telemetry failed:", e);
    }
    // Schedule next poll recursively
    setTimeout(poll, 8000);
  }
  
  poll();
  return () => {
    active = false;
  };
}, []);
```

---

## 📟 Super Admin CLI Terminal
- **Log Buffering**: Render status logs within styled custom scrolls (`custom-scrollbar overflow-y-auto`).
- **Interactive Commands**: Support console commands (e.g. decommission node, restart gateway and whitelist address) that immediately reflect on visual maps and trigger API sync logs.
- **Node Topology Charts**: Render interconnected gateways styled with responsive neon pulses representing healthy, warning, or offline node classes.
