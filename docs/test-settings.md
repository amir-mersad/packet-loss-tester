# 🧪 Test Settings Guide

The packet loss test provides several configurable settings. Here's what they mean and how they affect your test:

---

## 📦 Packet Size

**Definition:** The amount of data (in bytes) sent per packet.

- Default: `512 bytes`
- Larger packets = higher bandwidth usage
- Can simulate video call or game traffic
- Browser behavior may affect actual packet size due to metadata

**Recommendation:**  
Keep at default unless testing high-bandwidth use cases (e.g. streaming or gaming).

---

## 🔁 Frequency

**Definition:** Number of packets sent per second.

- Default: `16 packets/sec`
- Higher frequency = more network load
- Useful for simulating continuous data streams

**Example:**  
512 bytes × 16 packets/sec = 8192 bytes/sec = 8.0 KBps

---

## ⏱ Duration

**Definition:** How long the test should run (in seconds or minutes).

- Short tests detect common issues
- Long tests help detect **intermittent issues** or **buffer bloat**
- Keep in mind: longer tests may consume more resources and time

**Examples:**

- 10s: quick health check
- 60–300s: deep analysis

---

## ⌛ Acceptable Delay

**Definition:** The threshold (in milliseconds) after which a packet is considered "late".

- Late packets may arrive but still cause functional issues
- Use a delay suited to your real-world use case
- Ping varies by distance — local tests will tolerate less delay

**Examples:**

- Gaming: 50 ms
- Video calls: 100 ms
- Remote server: 300+ ms

---

## 🎮 Preset Approximations

Preset profiles you can use for common use cases:

| Profile    | Packet Size | Frequency | Duration | Delay Tolerance |
| ---------- | ----------- | --------- | -------- | --------------- |
| Gaming     | 256 B       | 30/sec    | 60s      | 50 ms           |
| Video Call | 512 B       | 20/sec    | 120s     | 100 ms          |
| File Sync  | 1024 B      | 10/sec    | 60s      | 200 ms          |

---

## ⏳ Wait Before Recording

**Definition:** Initial delay before results start recording.

- Prevents noise caused by setup/load spikes
- Useful for low-powered or overloaded systems

**Recommendation:**  
Enable if you notice abnormal packet loss during the first few seconds of the test.

---
