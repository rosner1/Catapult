import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import classification_report

class RandomForestModel:

    def __init__ (self, filename, features, target):
    
        """
        EXERCISE MODEL:
        filename = ...
        features = [['Sex', 'Age', 'Height', 'Weight', 'BMI', 'Hypertension', 'Diabetes', 'Goal', 'Fitness Type']]
        target = 'Exercise'
        ExerciseModel = RandomForestModel(filename, features, target)
        """

        self.df = pd.read_csv(filename) # Include path to csv here

        self.features = features # Relevant feature columns
        self.target = target # This column is the desired output of this model

        self.df = self.df.dropna(subset=[self.target]) # Drops observations without exercise data

        self.label_encoders = {} # These will be stored after encoding so that categorical variables may be decoded afterward

    def encode(self, features_to_encode):

        """
        features_to_encode=['Sex', 'Goal', 'Fitness Type', target], generally
        """

        # Encodes categorical variables and stores them for later use
        for col in features_to_encode:
            le = LabelEncoder()
            self.df[col] = le.fit_transform(df[col].astype(str))
            self.label_encoders[col] = le

    def split(self, test_size=0.2, random_state=42):
        """
        Splits the dataset into training and testing sets.
        Try with different test_size
        
        This must be run before anything that uses X_train, X_test, y_train, t_test
        """
        X = self.df[self.features]
        y = self.df[self.target]
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(X, y, test_size=test_size, random_state=random_state)

    def train(self, n_estimators=100, max_depth=None, random_state=42):
        """
        Trains a Random Forest classifier on the training data.

        Try different n_estimators

        Use this method before predict ***
        """
        self.model = RandomForestClassifier(n_estimators=n_estimators, max_depth=max_depth, random_state=random_state)
        self.model.fit(self.X_train, self.y_train)

    def predict(self, X=None):
        """
        Predicts labels for new data (or test data by default).
        """
        if X is None:
            X = self.X_test # Set X to test_data
        return self.model.predict(X) #Predict using model
    
    def evaluate(self):
        """
        Evaluates the model on the test set and prints a classification report from sklearn
        """
        y_pred = self.predict()
        print(classification_report(self.y_test, y_pred))