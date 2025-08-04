# phishing_url.py - Enhanced URL Classification
from transformers import pipeline, BertTokenizerFast, BertForSequenceClassification
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load model and tokenizer once at startup
MODEL_NAME = "CrabInHoney/urlbert-tiny-v4-phishing-classifier"

try:
    logger.info(f"Loading URL classification model: {MODEL_NAME}")
    tokenizer = BertTokenizerFast.from_pretrained(MODEL_NAME)
    model = BertForSequenceClassification.from_pretrained(MODEL_NAME)
    classifier = pipeline("text-classification", model=model, tokenizer=tokenizer)
    logger.info("✅ URL classification model loaded successfully")
except Exception as e:
    logger.error(f"❌ Failed to load URL model: {e}")
    classifier = None

def classify_url(url):
    """
    Classify a URL as phishing or benign using URLBERT model
    
    Args:
        url (str): The URL to classify
        
    Returns:
        dict: Classification result with label, score, and reason
    """
    if classifier is None:
        return {
            "label": "unknown",
            "score": 0.0,
            "reason": "Model not available"
        }
    
    try:
        # Preprocess URL (basic cleaning)
        cleaned_url = url.strip().lower()
        
        # Get prediction
        prediction = classifier(cleaned_url)[0]
        
        # Map labels (LABEL_1 = phishing, LABEL_0 = benign)
        label = "phishing" if prediction["label"] == "LABEL_1" else "benign"
        confidence = float(prediction["score"])
        
        # Add additional context
        risk_indicators = []
        if "bit.ly" in cleaned_url or "tinyurl" in cleaned_url:
            risk_indicators.append("URL shortener detected")
        if any(suspicious in cleaned_url for suspicious in ["secure", "verify", "update", "confirm"]):
            risk_indicators.append("Suspicious keywords detected")
        
        return {
            "label": label,
            "score": confidence,
            "reason": f"URLBERT Tiny v4 classification (confidence: {confidence:.3f})",
            "risk_indicators": risk_indicators,
            "model_version": "urlbert-tiny-v4"
        }
        
    except Exception as e:
        logger.error(f"URL classification error: {e}")
        return {
            "label": "error",
            "score": 0.0,
            "reason": f"Classification failed: {str(e)}"
        }
