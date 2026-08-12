import sys
import os

# Adds the root project folder to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from schemas import regret_output
from langchain_core.output_parsers import PydanticOutputParser
from langchain_groq import ChatGroq
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from .psych_chain import get_psycology_profile


llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0
)

parser = PydanticOutputParser(pydantic_object=regret_output)

system_prompt = """
You are a Predictive Decision Scientist and Behavioral Economist specializing in counterfactual regret analysis and impulse buyer dynamics.

### YOUR TASK
Evaluate a user's impending decision or purchase and calculate the precise probability (0–100%) that they will experience post-decision regret within the next 48 hours. Generate 3 distinct, highly specific explanatory reasons grounded in their psychological profile, current emotional state, situational context, and past behavioral history.

### ANALYTICAL EVALUATION FRAMEWORK
1. **Psychological Baseline (Weight: 35%):** How strongly do the traits in their condensed psychological profile (e.g., maximizer tendency, loss aversion, rumination predisposition) inherently incline them toward regret?
2. **Current State & Context Amplifiers (Weight: 45%):** Analyze the interaction between their current emotional state (e.g., fatigue, stress, euphoria), timing (e.g., late night), financial stakes, and impulse triggers. Emotional state-dependency drastically inflates regret odds.
3. **Historical Pattern Alignment (Weight: 20%):** If past history is provided, compare the current decision to previous choices. Match patterns where similar feelings or contexts previously led to regret (increasing score) or satisfaction (lowering score).

### REASON GENERATION RULES
- **Reason 1 (Psychological/Emotional Collision):** Explicitly link a core trait from their profile (e.g., rumination tendency) to their immediate emotional state (e.g., late-night stress).
- **Reason 2 (Contextual & Impulsivity Triggers):** Focus on situational risk factors such as price relative to value, timing, lack of research, or reactive marketing triggers.
- **Reason 3 (48-Hour Rumination Forecast):** Describe the exact psychological cognitive dissonance or "what if" scenario they will likely play out over the next 48 hours if they proceed.

### OUTPUT FORMAT REQUIREMENTS

Output ONLY a valid Pydantic object matching the following structure exactly. Do NOT include markdown code block syntax (```json), commentary, or introductory text.
{format_instructions}
"""

user_prompt ="""
Please evaluate the following decision for 48-hour regret probability based on the user's psychological profile, current situation, and past history.

### USER PSYCHOLOGICAL PROFILE
{condensed_profile}

### CURRENT DECISION & CONTEXT
- Decision / Purchase: {current_situation}
- Current Feeling / Mood: {current_feeling}

### HISTORICAL DECISION LOG
{previous_history}
"""

prompt = ChatPromptTemplate.from_messages([
    ("system",system_prompt),
    ("human",user_prompt)
]).partial(format_instructions=parser.get_format_instructions())

regret_probability_with_reasons = prompt | llm | parser

def get_regret_probability(condensed_profile:str, current_situation:str, current_feeling: str, previous_history:str="")->regret_output:
    output = regret_probability_with_reasons.invoke(
        {
            "condensed_profile":condensed_profile,
            "current_situation":current_situation,
            "current_feeling":current_feeling,
            "previous_history":previous_history,
        }
    )
    print(output.probability)
    print(output.reason_1)
    print(output.reason_2)
    print(output.reason_2)
    return output


if __name__=="__main__":
    from questionnaire import questionnaire
    condensed_profile = get_psycology_profile(questionnaire)
    current_situation = "Buying a $450 custom mechanical keyboard at 1:30 AM after seeing a limited-time drop ad"
    current_feeling = "Exhausted after a long work shift, anxious about an upcoming project, but feeling a quick rush of excitement about the product."
    output = get_regret_probability(condensed_profile,current_situation,current_feeling)