```markdown
# 🔮 Regret Oracle

> **🚧 Project Status: Active Development**  
> *Conceived at the UTS ProgSoC Hackathon (Theme: Turning Absurd Ideas into Viable Startup Concepts) and currently under active build.*

An AI-powered decision circuit-breaker that predicts 48-hour post-choice remorse and provides psychological reframing before impulse decisions cause financial or emotional harm.

---

## 🚦 Project Status & Roadmap

This project is an **ongoing build**. The core AI inference engine and prompt chains are functional, while additional microservices and integrations are currently in active development.

- [x] **Core AI Engine:** FastAPI + LangChain + Groq sub-300ms inference
- [x] **Pydantic Schemas:** Calibrated regret score & 3-card Tarot reader outputs
- [x] **Psychological Profiling:** 12-question diagnostic model implementation
- [ ] **Spring Cloud Infrastructure:** Ongoing service gateway & JWT auth integration
- [ ] **Chrome Extension:** In development (auto-intercept checkout pages past 11 PM)
- [ ] **48-Hour Feedback Loop:** Planned telemetry to continuously refine user profiles

---

## 📌 Overview

Late-night fatigue and emotional stress drastically impair prefrontal cortex function, leading to impulse purchases and reactive commitments. Standard warnings like *"Are you sure?"* fail 95% of the time because they lack emotional context.

**Regret Oracle** intercepts decisions in real time by:
1. **Psychological Profiling:** Mapping user decision traits (Maximizing, Impulsivity, Rumination, Loss Aversion, Locus of Control).
2. **Contextual Regret Calculation:** Synthesizing current state (timing, stress, stakes) to generate a calibrated **0–100% 48-hour regret score** in under 300ms.
3. **Reflective Tarot Pacifier:** Using Jungian archetype mechanics as a cognitive mirror to reframe urges and address root emotional drivers.

---

## 🛠️ Architecture & Tech Stack (In Progress)

The platform is designed as a hybrid microservices architecture combining a **Spring Cloud** backend infrastructure with a high-throughput **FastAPI + LangChain** AI inference pipeline.

```text
                  +-----------------------+
                  |    Frontend (Client)  |
                  +-----------+-----------+
                              |
                     +--------v--------+
                     |   API Gateway   |  (Spring Cloud Gateway - WIP)
                     +--------+--------+
                              |
          +-------------------+-------------------+
          |                                       |
+---------v----------+                 +----------v----------+
|   Auth Service     |                 |   Regret Service    | (User History & DB - WIP)
+--------------------+                 +----------+----------+
                                                  |
                                       +----------v----------+
                                       | Python Chain Svc    | (FastAPI + LangChain - ACTIVE)
                                       +----------+----------+
                                                  |
                                       +----------v----------+
                                       |   Groq / Llama 3.3  | (Sub-300ms Inference)
                                       +---------------------+

```

### Core Technologies

| Domain | Technology | Status |
| --- | --- | --- |
| **AI / LLM Framework** | LangChain, Pydantic v2, Groq (`llama-3.3-70b-versatile`) | **Functional** |
| **AI Service API** | Python 3.11+, FastAPI, Uvicorn | **Functional** |
| **Microservices Core** | Spring Cloud (Eureka Server, API Gateway, Auth Service) | **In Development** |
| **Data & State** | PostgreSQL, Redis | **In Development** |
| **Development** | Docker, Git, Virtualenv | **Active** |

---

## 📁 Repository Structure

```text
├── agent/                  # Autonomous decision agent logic (WIP)
├── api-gateway/            # Spring Cloud Gateway routing (WIP)
├── auth-service/           # User authentication & JWT management (WIP)
├── eureka-server/          # Service discovery registry (WIP)
├── frontend/              # Client dashboard & UI components (WIP)
├── python-chain-service/   # FastAPI + LangChain microservice (ACTIVE)
│   ├── main.py             # Route handlers & endpoints
│   ├── chains/             # LangChain prompts & output parsers
│   ├── models/             # Pydantic schema definitions
│   └── services/           # Deterministic Tarot deck engine
├── regret-service/         # Primary business logic & data persistence (WIP)
└── docker-compose.yml      # Local environment orchestration

```

---

## ⚡ Data Schemas (Active)

### Regret Prediction Model

```python
class RegretOutput(BaseModel):
    probability: int = Field(ge=0, le=100, description="Calculated regret percentage")
    reason_1: str = Field(description="Primary psychological collision driver")
    reason_2: str = Field(description="Contextual/situational risk factor")
    reason_3: str = Field(description="48-hour cognitive rumination forecast")

```

### Reflective Tarot Model

```python
class TarotReader(BaseModel):
    card_past: str
    suggested_read_past: str
    card_present: str
    suggested_read_present: str
    card_future: str
    suggested_read_future: str
    overall_remedial_reflective_advice: str

```

---

## 🔧 Active Local Development Setup

To run the functional Python AI service locally:

```bash
# Navigate to the Python service directory
cd python-chain-service

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Add your GROQ_API_KEY to .env

# Run the FastAPI server
uvicorn main:app --reload --port 8000

```

---

