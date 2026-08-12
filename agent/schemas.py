from pydantic import BaseModel, Field
from typing import Optional


class regret_output(BaseModel):
    probability: int = Field(ge=0, le= 100,description="""
Calculated integer score between 0 and 100 representing the probability that the user will experience post-decision regret within the next 48 hours.
Must be calibrated by synthesizing the user's condensed psychological profile,
current emotional state, decision parameters (timing, price/stakes, triggers),
and any historical regret patterns.""")
    reason_1 : str = Field(description="""
"The primary driver of the regret probability. Must explicitly connect a specific trait
from the user's psychological profile (e.g., maximizer tendency, loss aversion)
directly to their current emotional state or decision context.""")
    reason_2 : str = Field(description="""
Secondary situational or contextual risk factor driving regret potential,
such as late-night timing, fatigue/stress triggers, financial stakes relative to normal spending,
or lack of prior research.""")
    reason_3 : str = Field(description="""
The predicted cognitive outcome or rumination trigger over the next 48 hours.
Explains how the user's mind will process the decision post-facto
(e.g., playing out 'what-if' scenarios, buyer's remorse upon receipt, or post-purchase anxiety).""")


class TarotReader(BaseModel):
    card_past: str = Field(description="""
The name of a standard tarot card drawn from the 78-card deck representing the PAST
(e.g., 'Five of Cups', 'The Fool', 'Eight of Swords')""")
    suggested_read_past : str = Field(description="""
A 2-3 sentence reflective analysis connecting the Past card to the underlying
emotional trajectory, unmet needs, or behavioral triggers that led to this current decision state.""")
    card_present: str = Field(description="""
The name of a standard tarot card drawn from the 78-card deck representing the PRESENT
(e.g., 'Four of Cups', 'Temperance', 'The Moon').""")
    suggested_read_present : str = Field(description="""
A 2-3 sentence grounding insight for the Present card that teaches the user how to sit with,
process, or soothe their immediate emotional urge and anxiety right now without rushing to react.""")
    card_future: str = Field(description="""
The name of a standard tarot card drawn from the 78-card deck representing the FUTURE
(e.g., 'Two of Swords', 'The Star', 'Six of Pentacles').""")
    suggested_read_future : str = Field(description="""
A 2-3 sentence forward-looking perspective for the Future card focused on cognitive integration,
mindful outcome acceptance, and constructive action regardless of which choice they end up making.""")
    overall_remedial_reflective_advice : str = Field(description="""
A grounding 2-3 sentence closing synthesis. Acts as a therapeutic mirror and remedial strategy,
offering an actionable exercise or perspective shift to dissolve decision fatigue and process regret.""")