# 📆 Development Phases

| Phase | Title | Duration | Key Deliverables |
| ----- | ----- | -------- | ---------------- |

---

### **Phase 1: UI & API Scaffold**

**Duration**: 1 week
**Goal**: Set up basic project structure and frontend/backend communication.

#### Tasks:

* Scaffold React app (Vite or Next.js)
* Set up TailwindCSS & component library (e.g., ShadCN)
* Scaffold FastAPI backend with Docker
* Define API contract (OpenAPI via FastAPI)
* Add mock endpoint: `POST /start_test`, `WS /live`, `GET /servers`
* Basic UI with test form and placeholder chart

✅ *Outcome*: End-to-end dummy flow wired (frontend ↔ backend)

---

### **Phase 2: Rust CLI MVP (Packet Test Engine)**

**Duration**: 1.5 weeks
**Goal**: Build a working Rust-based packet test CLI tool.

#### Tasks:

* Build minimal ICMP ping engine (non-root, if possible)
* Parse args: host, interval, duration
* Output structured JSON stream
* Add error handling (e.g., no response)
* Test against multiple internal IPs

✅ *Outcome*: Working CLI tool that outputs clean JSON results

---

### **Phase 3: Backend Integration with Rust CLI**

**Duration**: 1 week
**Goal**: Connect backend to the Rust CLI and expose real-time data

#### Tasks:

* Spawn Rust subprocess with `subprocess.Popen`
* Read stdout line-by-line, parse JSON
* Push results to frontend via WebSocket
* Handle timeout/kill after duration
* Add backend session ID per test

✅ *Outcome*: Working backend that orchestrates real test sessions

---

### **Phase 4: Live Frontend Display**

**Duration**: 1.5 weeks
**Goal**: Visualize test results in real-time

#### Tasks:

* Implement WebSocket client in React
* Live-updating chart (e.g., latency graph with Recharts)
* Display loss %, jitter, RTT in UI
* Show per-ping timeline (mini-table)
* Style loading, error, no-data states

✅ *Outcome*: Smooth, real-time UX during test runs

---

### **Phase 5: Result Storage & Session History (Optional MVP+)**

**Duration**: 1 week
**Goal**: Add persistence and result recall

#### Tasks:

* Add SQLite/PostgreSQL (via SQLAlchemy or Tortoise ORM)
* Store each test session and stats
* `GET /results/{session_id}` → return saved result
* UI: simple history list & result viewer

✅ *Outcome*: Ability to review past test sessions

---

### **Phase 6: Dockerization & Deployment**

**Duration**: 1 week
**Goal**: Containerize all components and prepare for deployment

#### Tasks:

* Write `Dockerfile` for:

  * React frontend (build + serve)
  * Python backend
  * Rust tester (compile binary, multistage)
* Write `docker-compose.yml`
* Add `.env`, volume support, dev vs prod mode
* Verify end-to-end stack locally

✅ *Outcome*: Entire app runnable via `docker-compose up`

---

### **Phase 7: Documentation & Open Source Release**

**Duration**: 0.5 week
**Goal**: Final polish, publish open source repo

#### Tasks:

* Write `README.md` with usage & architecture diagram
* Add `LICENSE` (MIT or Apache 2.0)
* Add `CONTRIBUTING.md`, issue templates
* Final code cleanup and CI check
* Open source release on GitHub

✅ *Outcome*: Public, self-hostable open-source repo

---

## ⏳ Total Estimated Time: \~7.5 Weeks

> This timeline assumes part-time or startup-team development pace. With a focused full-time effort, it can be done in **\~4–5 weeks**.

