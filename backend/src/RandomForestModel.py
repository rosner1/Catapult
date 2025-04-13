import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, MultiLabelBinarizer
from sklearn.multioutput import MultiOutputClassifier
from sklearn.metrics import classification_report, accuracy_score

class RandomForestModel:
    def __init__ (self, df, features, target, multi_label=True):
        """
        initialize with given variables, fairly self-explanatory
        """
        # Load the data
        self.df = df
        self.features = features
        self.target = target
        self.multi_label = multi_label
        self.label_encoders = {} # initialize empty encoders to be used to decode at the end

        # Drop rows missing the target
        self.df = self.df.dropna(subset=[self.target])
        
        if self.multi_label:
            # LIST MUST BE SET BEFORE CALLING IN MAIN
            self.mlb = MultiLabelBinarizer()
            self.Y = self.mlb.fit_transform(self.df[self.target])
        else:
            self.Y = self.df[self.target]

    def encode(self, features_to_encode):
        """
        Encode categorical features in the data
        features_to_encode: list of columns to encode from main
        """
        for col in features_to_encode:
            le = LabelEncoder()
            self.df[col] = le.fit_transform(self.df[col].astype(str))
            self.label_encoders[col] = le

    def split(self, test_size=0.2, random_state=42):
        """
        Splits the dataset into training and testing sets
        For multi-label, use y from the one-hot encoded matrix
        """
        X = self.df[self.features]
        y = self.Y
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state)

    def train(self, n_estimators=5, max_depth=None, random_state=42):
        """
        Train a RandomForest classifier
        If it is multi-label, uses a multi output classifier around the base random forest one with the parameters
        """
        base_rf = RandomForestClassifier(n_estimators=n_estimators, max_depth=max_depth, random_state=random_state)
        if self.multi_label:
            self.model = MultiOutputClassifier(base_rf)
        else:
            self.model = base_rf
        self.model.fit(self.X_train, self.y_train)

    def predict(self, X=None):
        """
        Returns predictions
        X is set to the test set if it isn't specified, because this makes more sense with the pipeline
        """
        if X is None:
            X = self.X_test
        return self.model.predict(X)

    def evaluate(self):
        """
        Evaluates the model on the test set
        Otherwise, prints overall accuracy and then classification report

        For multi-label, prints a classification report for each exercise
        """
        y_pred = self.predict()
        if self.multi_label:
            print("Multi-label classification reports:")
            for i, exercise in enumerate(self.mlb.classes_):
                print(f"\nReport for {exercise}:")
                print(classification_report(self.y_test[:, i], y_pred[:, i]))
        else:
            print("Accuracy:", accuracy_score(self.y_test, y_pred))
            print(classification_report(self.y_test, y_pred))

    def run_pipeline(self, features_to_encode, test_size=0.2):
        """
        Executes multiple functions and evaluates so that you can get an idea of how it's doing
        """
        self.encode(features_to_encode)
        self.split(test_size=test_size)
        self.train()
        return self.evaluate()

    def preprocess_input(self, input_dict):
        """
        Processes input, is used in predict
        """
        input_data = {}
        for col in self.features:
            value = input_dict.get(col, np.nan)
            if isinstance(value, str) and value.strip().lower() == "na":
                value = np.nan
            input_data[col] = value

        df_input = pd.DataFrame([input_data])

        for col, le in self.label_encoders.items():
            if col in df_input.columns:
                if df_input[col].isnull().any():
                    df_input[col].fillna(le.classes_[0], inplace=True)
                df_input[col] = le.transform(df_input[col].astype(str))

        df_input[self.features] = df_input[self.features].apply(lambda col: pd.to_numeric(col, errors='coerce'))
        return df_input

    def predict_single(self, input_dict, threshold=0.5):
        """
        Uses scores and recommendations for multilabel
        """
        df_input = self.preprocess_input(input_dict)
        if self.multi_label:
            prob_arrays = self.model.predict_proba(df_input[self.features])
            scores = {}
            for i, exercise in enumerate(self.mlb.classes_):
                # Each prob_arrays[i] is shape (1,2): probability for class 0 and class 1.
                prob_inclusion = prob_arrays[i][0][1]
                scores[exercise] = float(prob_inclusion)
            recommendations = {ex: score for ex, score in scores.items() if score >= threshold}
            return {"scores": scores, "recommendations": recommendations}
        else:
            pred = self.model.predict(df_input[self.features])
            if self.target in self.label_encoders:
                pred_text = self.label_encoders[self.target].inverse_transform(pred)
            else:
                pred_text = pred
            return pred_text[0]