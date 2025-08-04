
import joblib
import pandas as pd
import json

# Load model and preprocessing tools
isof = joblib.load("isolation_model.joblib")
imputer = joblib.load("imputer.joblib")
encoder = joblib.load("encoder.joblib")
features = json.load(open("features.json"))
cat_cols = json.load(open("cat_cols.json"))

def predict_transaction(user_input: dict):
    sample_df = pd.DataFrame(user_input)

    # Impute
    sample_df = pd.DataFrame(imputer.transform(sample_df), columns=features)

    # Encode
    sample_df[cat_cols] = encoder.transform(sample_df[cat_cols].astype(str))

    # Predict
    pred = isof.predict(sample_df)
    return "Fraud" if pred[0] == -1 else "Legit"
