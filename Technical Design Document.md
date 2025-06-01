# 🛠️ Technical Design Document

**Project Name**: `packet-loss-analyzer`
**Purpose**: Internal packet loss and latency test tool (open-source)
**Stack**: React.js (UI) · Python (Backend API) · Rust (Packet testing engine) · Docker (Containerization)

---

## 📌 Overview

This tool will test packet loss, latency, and jitter for internal servers and networked devices in real-time, inspired by public services like [packetlosstest.com](https://packetlosstest.com). However, it will be:

* **Self-hosted** on internal infrastructure
* **Modular & open source**
* **Built with modern and fast technologies**
* **Highly extensible** (e.g., future TLS testing, traceroute support)

---

## 🧱 Architecture

```
+-------------------------+       +--------------------------+
|   React Frontend (UI)   | <-->  |   Python Backend (FastAPI)|
+-------------------------+       +--------------------------+
                                         |
                                         v
                                +------------------+
                                |  Rust Engine (CLI)|
                                +------------------+
                                         |
                                         v
                                +------------------+
                                |   System Network  |
                                +------------------+
```

---

## 🧩 Components

### 1. Frontend (React.js + TailwindCSS)

* **Framework**: React.js (with Vite or Next.js)
* **Design**: TailwindCSS
* **Features**:

  * Server selection (from internal list)
  * Start/stop test buttons
  * Real-time packet loss/latency graph (via WebSocket or polling)
  * Result summary table
  * Dark mode and responsive UI

### 2. Backend API (Python - FastAPI)

* **Framework**: FastAPI
* **Responsibilities**:

  * Serve API endpoints
  * Manage WebSocket/RESTful communication
  * Spawn and manage Rust CLI subprocess for testing
  * Parse Rust output and stream to frontend
  * Logging and audit support
* **Endpoints**:

  * `GET /servers`: List of available internal servers
  * `POST /start_test`: Start a packet loss test
  * `GET /results/{session_id}`: Retrieve past results
  * `WS /live/{session_id}`: WebSocket stream for real-time results

### 3. Packet Test Engine (Rust CLI Tool)

* **Language**: Rust
* **Crates**: `tokio`, `ping`, `serde`, `clap`, `chrono`
* **Responsibilities**:

  * Perform ICMP packet tests (ping-like)
  * Measure:

    * Packet loss percentage
    * Average latency (RTT)
    * Jitter
  * Output results as structured JSON (e.g., streaming every 1 second)
* **Command Example**:

  ```bash
  ./packet-tester --host 192.168.0.1 --interval 1s --duration 30s --output json
  ```

### 4. Containerization (Docker & Docker Compose)

* **Dockerfiles**:

  * `frontend/Dockerfile` → Build React app
  * `backend/Dockerfile` → Run FastAPI app
  * `tester/Dockerfile` → Compile Rust binary
* **Docker Compose**:

  * Service orchestration for backend, frontend, and tester
  * Use shared volumes or RPC from backend to Rust tester

---

## 🧪 Sample Flow

1. User opens UI → Selects internal server → Clicks **Start Test**
2. Frontend calls `/start_test` (Python API)
3. Backend spawns Rust CLI with options, begins reading output stream
4. Real-time data streamed via WebSocket to frontend
5. UI updates graphs/tables in real time
6. User can view/export session results

---

## 🗂️ Repository Structure

```
packet-loss-analyzer/
├── backend/              # Python (FastAPI)
│   ├── main.py
│   ├── api/
│   ├── models/
│   └── utils/
├── frontend/             # React.js + TailwindCSS
│   ├── src/
│   └── public/
├── tester/               # Rust CLI
│   ├── src/
│   └── Cargo.toml
├── docker/
│   ├── docker-compose.yml
│   ├── frontend.Dockerfile
│   ├── backend.Dockerfile
│   └── tester.Dockerfile
├── README.md
└── LICENSE
```

---

## 🚀 Future Enhancements

* [ ] **Add Traceroute Support** (Rust)
* [ ] **Export Results to CSV/PDF**
* [ ] **Historical Data Storage (PostgreSQL)**
* [ ] **Authentication/Authorization**
* [ ] **Mobile UI Viewport Optimization**
* [ ] **Multi-server simultaneous test**

---

## 📜 Open Source Considerations

* License: MIT or Apache 2.0 (based on compatibility with dependencies)
* Contribution Guide: `CONTRIBUTING.md`
* Code of Conduct: `CODE_OF_CONDUCT.md`
* Public Repo Hosting: GitHub

---

## ✅ Dependencies

| Component   | Libraries/Tools                        |
| ----------- | -------------------------------------- |
| Frontend    | React.js, TailwindCSS, Recharts, Axios |
| Backend     | FastAPI, Uvicorn, Pydantic, Subprocess |
| Rust Tester | `ping`, `tokio`, `clap`, `serde_json`  |
| DevOps      | Docker, Docker Compose                 |

---

## ⚙️ Example CLI Output (Rust)

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

## 🧪 Testing & CI

* Unit tests for backend endpoints (PyTest)
* Integration test for CLI + Backend
* Frontend E2E with Playwright or Cypress
* CI: GitHub Actions pipeline

  * Lint + Test + Build Docker images
