# main.py
import json
import joblib
import pandas as pd
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from pydantic import BaseModel
import numpy as np


app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Welcome to the file server!"}

@app.get("/predict.py")
async def get_predict_py():
    return FileResponse("/content/predict.py", media_type="text/plain")

@app.get("/isolation_model.joblib")
async def get_isolation_model():
    return FileResponse("/content/isolation_model.joblib", media_type="application/octet-stream")

@app.get("/imputer.joblib")
async def get_imputer():
    return FileResponse("/content/imputer.joblib", media_type="application/octet-stream")

@app.get("/features.json")
async def get_features():
    return FileResponse("/content/features.json", media_type="application/json")

@app.get("/encoder.joblib")
async def get_encoder():
    return FileResponse("/content/encoder.joblib", media_type="application/octet-stream")

@app.get("/cat_cols.json")
async def get_cat_cols():
    return FileResponse("/content/cat_cols.json", media_type="application/json")

@app.get("/train_transaction.csv")
async def get_train_transaction():
    return FileResponse("/content/train_transaction.csv", media_type="text/csv")

@app.get("/train_identity.csv")
async def get_train_identity():
    return FileResponse("/content/train_identity.csv", media_type="text/csv")

@app.get("/test_transaction.csv")
async def get_test_transaction():
    return FileResponse("/content/test_transaction.csv", media_type="text/csv")

@app.get("/test_identity.csv")
async def get_test_identity():
    return FileResponse("/content/test_identity.csv", media_type="text/csv")

@app.get("/sample_submission.csv")
async def get_sample_submission():
    return FileResponse("/content/sample_submission.csv", media_type="text/csv")

@app.get("/ieee_fraud.py")
async def get_ieee_fraud_py():
    return FileResponse("/content/ieee_fraud.py", media_type="text/plain")

# Load models and data
isolation_model = joblib.load("/content/isolation_model.joblib")
imputer = joblib.load("/content/imputer.joblib")
encoder = joblib.load("/content/encoder.joblib")
with open("/content/features.json", "r") as f:
    features = json.load(f)
with open("/content/cat_cols.json", "r") as f:
    cat_cols = json.load(f)

class PredictionInput(BaseModel):
    data: dict

@app.post("/predict")
async def predict(input_data: PredictionInput):
    try:
        # Convert input data to DataFrame
        df = pd.DataFrame([input_data.data])

        # Ensure all feature columns are present, fill missing with NaN
        for feature in features:
            if feature not in df.columns:
                df[feature] = np.nan

        df = df[features]

        # Apply imputation
        df_imputed = pd.DataFrame(imputer.transform(df), columns=features)

        # Apply one-hot encoding
        # Handle potential unknown categories by setting handle_unknown='ignore'
        df_encoded = encoder.transform(df_imputed[cat_cols])
        df_encoded = pd.DataFrame(df_encoded, columns=encoder.get_feature_names_out(cat_cols))

        # Combine processed features - exclude original categorical columns before concatenation
        df_processed = pd.concat([df_imputed.drop(columns=cat_cols), df_encoded], axis=1)


        # Ensure the order of columns matches the training data's feature order for prediction
        # This step might require knowing the exact column order used during model training
        # For simplicity here, we assume the order after processing is consistent.
        # A more robust approach would store the column order after training.

        # Predict using Isolation Forest
        anomaly_score = isolation_model.decision_function(df_processed)
        # Isolation Forest predict method returns -1 for anomalies, 1 for inliers
        prediction = isolation_model.predict(df_processed)

        return {"anomaly_score": anomaly_score.tolist(), "prediction": prediction.tolist()}

    except Exception as e:
        return {"error": str(e)}