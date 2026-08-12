import sys
import os

# Adds the root project folder to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from chains.psych_chain import get_psycology_profile
from chains.regret_probability_chain import get_regret_probability
from chains.tarot_chain import get_tarot_remedy


# To be fetched from data base

questionnaire = """When making a purchase, I spend extensive time researching to ensure I get the absolute best option available rather than settling for "good enough." : 5

# I often buy items or make decisions spontaneously when I am feeling tired, stressed, or late at night. : 3

# After making a choice, I frequently catch myself playing out alternative scenarios in my head ("what if I had picked something else?"). : 5

# I feel a sharp sense of anxiety or discomfort immediately after spending a significant amount of money. : 4

# When a decision turns out badly, I tend to blame external circumstances or clever marketing rather than my own judgment. : 2

# I find it easy to let go of bad purchases and rarely think about them once the money is spent. : 3

# If I see a good deal or limited-time offer, I feel an urgent need to act before thoroughly evaluating whether I actually need it. : 4

# I take full personal ownership when a decision goes wrong, even if outside factors influenced the outcome. : 4"""

pshcy_profile= get_psycology_profile(questionnaire)
print("*=================================Psycological Profile of user==========================*")
print(f"\n{pshcy_profile}\n")

# now we will feed this profile along with current situation to the llm to judge probability
#To be fetched from database
current_situation = "Purchasing earphones worth 20 dollars, even when i already one"
current_feeling = "I am excited"
output = get_regret_probability(pshcy_profile,current_situation,current_feeling)
print("*===================Regret Probability===================*")
print(f"Regret Probability: {output.probability}")
print("Reasons:")
print(f"""
1: {output.reason_1}

2: {output.reason_2}

3: {output.reason_3}""")
# now lets get pshcylogical reading remedy using tarot

tarot_output = get_tarot_remedy(current_situation,output.reason_1,output.reason_2,output.reason_3)

print("*================Tarot Analysis and Remedy=====================*")
print(f"""
Past Card : {tarot_output.card_past}
Meaning of Past Card: {tarot_output.suggested_read_past}

Present Card : {tarot_output.card_present}
Meaning of Present Card: {tarot_output.suggested_read_present}

Future Card : {tarot_output.card_future}
Meaning of Future Card: {tarot_output.suggested_read_future}

General advice: {tarot_output.overall_remedial_reflective_advice}
""")

