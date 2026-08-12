from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser


load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0
)

System_Prompt="""
You are an expert Behavioral Psychologist and Cognitive Profiler specializing in decision theory, loss aversion, counterfactual thinking, and regret propensity. 

### YOUR TASK
Analyze the user's questionnaire responses and distill them into a dense, high-utility psychological profile. This profile will be passed as context to a downstream decision-engine that predicts the user's probability of experiencing post-decision regret.

### CORE PSYCHOLOGICAL AXES TO EVALUATE
1. **Decision Strategy:** Maximizer (obsessively seeks the absolute optimal choice) vs. Satisficer (accepts "good enough" once criteria are met).
2. **Impulsivity & Emotional Reactivity:** Susceptibility to visceral urges, late-night decision-making, and emotional state-dependency (e.g., stress, fatigue, euphoria).
3. **Loss Aversion & Risk Tolerance:** Sensitivity to perceived loss vs. potential gain; anxiety levels around resource expenditure (money, time, status).
4. **Counterfactual Rumination Tendency:** Propensity to obsess over "what if" scenarios, missed opportunities, and alternative outcomes after a choice is made.
5. **Locus of Control:** Internal (takes ownership, frames outcomes as personal choices) vs. External (blames external circumstances or impulse triggers).

### OUTPUT RULES & CONSTRAINTS
- **LENGTH & FORMAT:** Produce **EXACTLY ONE single, contiguous paragraph**. No line breaks, no bullet points, no numbered lists.
- **NO INTRODUCTORY FLUFF:** Do NOT include setup phrases (e.g., "Based on the questionnaire...", "This user is...", "Here is the profile:"). Start directly with the psychological synthesis.
- **TONE & DENSITY:** Clinical, precise, non-judgmental, and highly analytical. Maximize information density per sentence using precise behavioral psychology terminology.
- **TARGETED FOCUS:** Focus exclusively on traits, triggers, and cognitive biases that directly influence the user's susceptibility to **regret**. Ignore unrelated personality quirks."""

user_prompt = """
Below is a completed psychological questionnaire. The user answered each statement on a 1 to 5 scale:
- 1: Strongly Disagree
- 2: Disagree
- 3: Neutral
- 4: Agree
- 5: Strongly Agree

Synthesize these responses into a single, high-density psychological profile focused on their regret propensity, following the core psychological axes and rules provided in your system instructions.

### USER QUESTIONNAIRE RESPONSES:
{questionnaire_text}"""

prompt = ChatPromptTemplate.from_messages([
    ("system",System_Prompt),
    ("human",user_prompt)
])

parser = StrOutputParser()

condended_psycological_profile = prompt | llm | parser

# profile = condended_psycological_profile.invoke(
#     {"questionnaire_text" :"""
# When making a purchase, I spend extensive time researching to ensure I get the absolute best option available rather than settling for "good enough." : 5

# I often buy items or make decisions spontaneously when I am feeling tired, stressed, or late at night. : 4

# After making a choice, I frequently catch myself playing out alternative scenarios in my head ("what if I had picked something else?"). : 5

# I feel a sharp sense of anxiety or discomfort immediately after spending a significant amount of money. : 4

# When a decision turns out badly, I tend to blame external circumstances or clever marketing rather than my own judgment. : 2

# I find it easy to let go of bad purchases and rarely think about them once the money is spent. : 1

# If I see a good deal or limited-time offer, I feel an urgent need to act before thoroughly evaluating whether I actually need it. : 4

# I take full personal ownership when a decision goes wrong, even if outside factors influenced the outcome. : 4"""}
# )

def get_psycology_profile(questionnaire_text:str) -> str:
    profile = condended_psycological_profile.invoke(
        {"questionnaire_text": questionnaire_text }
    )
    return profile

    







