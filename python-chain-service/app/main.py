"""HTTP boundary for the regret and tarot chain implementations."""

from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="Regret Tarot Chain Service", version="0.1.0")


class RegretRequest(BaseModel):
    regret: str = Field(min_length=1)


class TarotRequest(BaseModel):
    question: str = Field(min_length=1)


def run_regret_chain(regret: str) -> dict[str, str]:
    return {
        "reflection": f"You shared: {regret}",
        "next_step": "Name one kind action you can take today.",
    }


def run_tarot_chain(question: str) -> dict[str, str]:
    return {
        "question": question,
        "card": "The Star",
        "interpretation": "Hope, renewal, and a gentle path forward.",
    }


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/run_regret_chain")
def run_regret(request: RegretRequest) -> dict[str, str]:
    return run_regret_chain(request.regret)


@app.post("/run_tarot_chain")
def run_tarot(request: TarotRequest) -> dict[str, str]:
    return run_tarot_chain(request.question)
