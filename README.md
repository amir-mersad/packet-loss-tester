# 📡 packet-loss-analyzer

**Open-source, self-hosted tool to test packet loss, latency, and jitter across internal servers and networks.**  
Built with **React.js**, **FastAPI (Python)**, **Rust**, and **Docker**.

Inspired by [packetlosstest.com](https://packetlosstest.com) — reimagined for private infrastructure.

---

## 🚀 Features

- ✅ Real-time packet loss and latency testing
- 📈 Live visualization with charts and summary metrics
- ⚡ Fast and efficient Rust-based ICMP engine
- 🔌 Simple REST + WebSocket API (FastAPI)
- 🐳 Easy to deploy with Docker
- 🛠️ Open source, modular, and extensible

---

## 🖼️ Architecture

```

+-------------------------+       +--------------------------+
\|   React Frontend (UI)   | <-->  |   Python Backend (FastAPI)|
+-------------------------+       +--------------------------+
|
v
+------------------+
\|  Rust Engine (CLI)|
+------------------+
|
v
+------------------+
\|   System Network  |
+------------------+

```

---

## 📦 Tech Stack

| Layer    | Tech                       |
| -------- | -------------------------- |
| Frontend | React.js + TailwindCSS     |
| Backend  | FastAPI (Python)           |
| Engine   | Rust CLI with Tokio, Clap  |
| DevOps   | Docker + Docker Compose    |
| Realtime | WebSocket + JSON streaming |

---

## 🔧 Usage

### 1. Clone the repo

```bash
git clone https://github.com/amir-mersad/packet-loss-analyzer.git
cd packet-loss-analyzer
```

### 2. Build & Run with Docker

```bash
docker-compose up --build
```

This spins up:

- Frontend at `http://localhost:3000`
- API at `http://localhost:8000`
- Rust tester via backend subprocess

---

## 📡 API Overview

### `GET /servers`

Returns list of predefined internal servers

### `POST /start_test`

Starts a new packet loss test

### `WS /live/{session_id}`

Streams real-time results via WebSocket

### `GET /results/{session_id}`

Fetches stored session results (optional)

---

## 🖥️ CLI (Rust Engine)

Standalone binary to run ping-based tests:

```bash
cargo run -- --host 192.168.1.1 --duration 30s --interval 1s --output json
```

Output sample:

```json
{
  "timestamp": "2025-05-31T09:20:00Z",
  "target": "192.168.1.1",
  "sent": 10,
  "received": 9,
  "loss_pct": 10,
  "avg_rtt_ms": 23.4,
  "jitter_ms": 4.5
}
```

---

## 📂 Repo Structure

```
packet-loss-analyzer/
├── backend/              # FastAPI server
├── frontend/             # React + Tailwind UI
├── tester/               # Rust packet test engine
├── docker/               # Dockerfiles and docker-compose.yml
├── README.md
└── LICENSE
```

---

## 🧪 Test Settings Documentation

Want to learn what all the test settings mean and how to use them?

➡️ [See Test Settings Guide](docs/test-settings.md)

---

## 💡 Roadmap

- [ ] Export results to CSV/PDF
- [ ] Traceroute support
- [ ] Login + auth system
- [ ] Simultaneous multi-server testing
- [ ] Mobile-first UI

---

## 🤝 Contributing

Contributions welcome! Please open issues, submit PRs, or suggest ideas.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for more details.

---

## 📄 License

MIT License. See [`LICENSE`](./LICENSE).

---

## 🌐 Maintainers

This project is maintained by \[Your Company Name] for internal use — and shared with the open-source community.

---

## 🙏 Acknowledgements

- Inspired by [packetlosstest.com](https://packetlosstest.com)
- Built with love using open-source tools ❤️

---
