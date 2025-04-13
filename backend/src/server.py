# app.py (Flask backend)
from flask import Flask, request, jsonify
from flask_cors import CORS

from RandomForestModel import RandomForestModel
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, MultiLabelBinarizer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
from sklearn.metrics import classification_report, accuracy_score
import random

import json

#clean df into 
df = pd.read_csv("exercise_data_updated.csv")

def convert_to_list(s):
    # strip and lowercase s
    cleaned = s.replace(", and ", ",").lower()
    cleaned = cleaned.replace("or", "")
    cleaned = cleaned.replace(".", "")
    return [i.strip() for i in cleaned.split(",") if i.strip()]

df = df.dropna(subset=['Exercises'])
df['Exercises'] = df['Exercises'].apply(convert_to_list)
mlb = MultiLabelBinarizer()
Y = mlb.fit_transform(df['Exercises'])
print("Exercise classes:", mlb.classes_)
all_exercises = set(mlb.classes_)

def add_randomness(ex_list, removal_prob=0.1, addition_prob=0.1):
    """
    Introduce randomness
    """
    # Remove items with removal probability.
    new_list = [ex for ex in ex_list if random.random() > removal_prob]


    # Identify exercises not in new_list.
    missing = list(all_exercises - set(new_list))

    # With addition_prob probability, add a randomly chosen exercise from the missing ones.
    if missing and random.random() < addition_prob:
        new_item = random.choice(missing)
        new_list.append(new_item)

    return new_list

df['Exercises'] = df['Exercises'].apply(add_randomness)

features = ['Height', 'Weight', 'Fitness Goal']
target = 'Exercises'
exerciseModel = RandomForestModel(df, features, target, multi_label=True)
features_to_encode = ['Fitness Goal']
print(exerciseModel.run_pipeline(features_to_encode))

person = {
    'Height' : 1.5,
    'Weight' : 50,
    'Fitness Goal' : 'Weight Gain'
}
print(exerciseModel.predict_single(person))

# Now, with vegetables:

df = pd.read_csv("exercise_data_adj.csv")
df = df.dropna(subset=['Vegetables'])
df['Vegetables'] = df['Vegetables'].apply(lambda x: eval(x))

def lower_and_clean(items):
    return [s.replace("and", "").replace("or", "").replace(".", "").strip().lower() for s in items]

df['Vegetables'] = df['Vegetables'].apply(lower_and_clean)

mlb = MultiLabelBinarizer()
Y = mlb.fit_transform(df['Vegetables'])
print("Vegetable classes:", mlb.classes_)
all_vegetables = set(mlb.classes_)

features = ['Height', 'Weight', 'Fitness Goal']
target = 'Vegetables'
vegetableModel = RandomForestModel(df, features, target, multi_label=True)
features_to_encode = ['Fitness Goal']
print(vegetableModel.run_pipeline(features_to_encode))



print(vegetableModel.predict_single(person))



df = pd.read_csv("exercise_data_adj.csv")
df = df.dropna(subset=['Protein Intake'])
df['Protein Intake'] = df['Protein Intake'].apply(lambda x: eval(x))

df['Protein Intake'] = df['Protein Intake'].apply(lower_and_clean)

mlb = MultiLabelBinarizer()
Y = mlb.fit_transform(df['Protein Intake'])
print("Protein Intake classes:", mlb.classes_)
all_protein = set(mlb.classes_)

features = ['Height', 'Weight', 'Fitness Goal']
target = 'Protein Intake'
proteinModel = RandomForestModel(df, features, target, multi_label=True)
features_to_encode = ['Fitness Goal']
print(proteinModel.run_pipeline(features_to_encode))


print(proteinModel.predict_single(person))


### MODEL IS FINISHED TRAINING

app = Flask(__name__)
CORS(app)  # 🛡️ allow cross-origin requests from Next.js

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    data['Fitness Goal'] = data['goal']
    data['Height'] = data['height']
    data['Weight'] = data['weight']
    print("Received data:", data)
    

    ###  EXERCISE PREDICTIONS

    exercise_predictions = exerciseModel.predict_single(data)['scores']
    top_exercise_predictions = sorted(exercise_predictions.items(), key=lambda x: x[1], reverse=True)[:5]

    top_exercise_predictions_dict = {}

    for item in top_exercise_predictions:
        top_exercise_predictions_dict[item[0]] = item[1]


    ###  VEGETABLE PREDICTIONS

    vegetable_predictions = vegetableModel.predict_single(data)['scores']
    top_vegetable_predictions = sorted(vegetable_predictions.items(), key=lambda x: x[1], reverse=True)[:5]

    top_vegetable_predictions_dict = {}

    for item in top_vegetable_predictions:
        top_vegetable_predictions_dict[item[0]] = item[1]


    ###  PROTEIN PREDICTIONS

    protein_predictions = proteinModel.predict_single(data)['scores']
    top_protein_predictions = sorted(protein_predictions.items(), key=lambda x: x[1], reverse=True)[:5]

    top_protein_predictions_dict = {}

    for item in top_protein_predictions:
        top_protein_predictions_dict[item[0]] = item[1]

    
    ###  COMBINATION TO SEND

    ultra_dict = {
        'Exercises' : top_exercise_predictions_dict,
        'Vegetables' : top_vegetable_predictions_dict,
        'Proteins' : top_protein_predictions_dict
    }

    print("Sending:", ultra_dict)

    return jsonify(ultra_dict), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
