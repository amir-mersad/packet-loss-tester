# 🤝 Contributing to Packet Loss Analyzer

Thank you for considering contributing to this open-source project! We're excited to build a reliable and modern packet testing platform together.

---

## 🛠 How to Contribute

### 1. Fork the Repository
Click the **"Fork"** button at the top of this page to create your own copy.

### 2. Clone Your Fork
```bash
git clone https://github.com/your-username/packet-loss-analyzer.git
cd packet-loss-analyzer
````

### 3. Set Up

* Ensure you have **Docker** installed (for full-stack dev).
* Or set up dev environments for each module:

  * React: `cd frontend && npm install`
  * Python: `cd backend && pip install -r requirements.txt`
  * Rust: `cd tester && cargo build`

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 5. Commit Your Changes

Follow the conventional commit format:

```
feat(frontend): add test result chart
fix(backend): handle empty IPs gracefully
```

### 6. Push and Open a PR

```bash
git push origin feature/your-feature-name
```

Then go to GitHub and open a **Pull Request** to the `main` branch.

---

## 🧪 Local Development

Use Docker:

```bash
docker-compose up --build
```

Or run modules separately:

* `frontend/`: `npm run dev`
* `backend/`: `uvicorn main:app --reload`
* `tester/`: `cargo run -- --host 8.8.8.8`

---

## 📋 Code Guidelines

* Follow **PEP8** for Python
* Use **Rustfmt** for Rust formatting
* Use **Prettier** for React code
* Write meaningful commit messages
* Test your changes before pushing

---

## 🧪 Tests

Add unit or integration tests where applicable:

* Python (backend): `pytest`
* Rust (tester): `cargo test`
* React (frontend): `vitest` or `jest`

---

## 📁 Project Structure

```
frontend/      → React + Tailwind UI
backend/       → FastAPI (Python)
tester/        → Rust CLI engine
docker/        → Docker & Compose setup
```

---

## 🙋 Need Help?

Feel free to [open an issue](https://github.com/amir-mersad/packet-loss-analyzer/issues/new/choose) or join the discussions tab!

---

Thank you again! Let's build something great. 🚀
