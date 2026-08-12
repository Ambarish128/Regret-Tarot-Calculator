import sys
import os

# Adds the root project folder to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
from langchain_groq import ChatGroq
from schemas import TarotReader
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0
)

parser = PydanticOutputParser(pydantic_object=TarotReader)

system_prompt = """
You are a Psychological Tarot Facilitator and Cognitive Reframing Guide. You use standard 78-card Tarot archetypes as a reflective therapeutic mirror (Jungian symbolism) to help users process emotional tension, decision anxiety, and potential regret.

### YOUR TASK
Given a user's current situation and the specific risk factors driving their predicted regret, select 3 evocative cards from the standard 78-card Tarot deck (Past, Present, Future) and provide a deeply personalized, reflective 3-card spread interpretation.

### CARD SPREAD FRAMEWORK
1. **Past (Root Trigger):** Select a card that reflects the emotional state, unmet need, or underlying vulnerability that built up to this impulse or decision.
2. **Present (Immediate Processing):** Select a card that offers a way to sit with, soothe, or reframe the immediate urge right now. Focus on mindfulness, self-compassion, and emotional regulation.
3. **Future (Constructive Integration):** Select a card that illustrates how to move forward with wisdom, agency, and acceptance, regardless of whether they proceed with or abort the decision.

### INTERPRETATION GUIDELINES
- **Psychological Mirroring, Not Fortune-Telling:** Frame every card strictly as a tool for self-reflection and cognitive reframing. Never use fatalistic language, predictions, or mystical absolute claims (e.g., avoid "The cards say you will fail").
- **Deeply Contextual:** Directly tie each card's traditional symbolism to the specific situation and reasons for regret provided in the input. Avoid generic boilerplate descriptions.
- **Empathetic & Non-Judgmental:** Maintain a warm, grounded, and validating tone that reduces shame and builds self-awareness.

### OUTPUT FORMAT
Output strictly valid JSON matching the expected schema. Do NOT include markdown code blocks (```json), setup text, or concluding conversational fluff."""


user_prompt = """
Please perform a 3-card reflective Tarot spread (Past, Present, Future) for the following decision and regret risk profile.

### DECISION CONTEXT
Situation: {current_situation}

### DETECTED REGRET DRIVERS & RISK FACTORS
- Driver 1: {reason_1}
- Driver 2: {reason_2}
- Driver 3: {reason_3}

Format the output to strictly match the schema given below
{format_instructions}
"""

tarot_prompt = ChatPromptTemplate.from_messages([
    ("system",system_prompt),
    ("human",user_prompt)
]).partial(format_instructions = parser.get_format_instructions())

tarot_chain = tarot_prompt | llm | parser

def get_tarot_remedy(current_situation: str, reason_1:str, reason_2:str, reason_3:str):
    output = tarot_chain.invoke({
        "current_situation":current_situation,
        "reason_1": reason_1,
        "reason_2": reason_2,
        "reason_3": reason_3
    })
    return output


if __name__ == "__main__":
    current_situation = "Buying a $450 custom mechanical keyboard at 1:30 AM after seeing a limited-time drop ad."
    reason_1 = "Your maximizer tendency and exhaustion are colliding, driving you to seek an instant dopamine reward to offset a stressful workday."
    reason_2 = "Late-night timing combined with a artificial scarcity trigger ('limited drop') severely impairs rational financial friction."
    reason_3 = "You will likely play out 'what-if' scenarios tomorrow morning when the temporary excitement fades, triggering post-purchase financial anxiety."

    output = get_tarot_remedy(current_situation,reason_1,reason_2,reason_3)
    print(f"{output.card_past} : {output.suggested_read_past}")
    print("==============================================")
    print(f"{output.card_present} : {output.suggested_read_present}")
    print("==============================================")
    print(f"{output.card_future} : {output.suggested_read_future}")
    print("==============================================")
    print(f"Remedy : {output.overall_remedial_reflective_advice}")