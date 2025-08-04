# phishing_text.py - Enhanced Text Classification
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
import logging
import re

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODEL = "cybersectony/phishing-email-detection-distilbert_v2.4.1"

try:
    logger.info(f"Loading text classification model: {MODEL}")
    tokenizer = AutoTokenizer.from_pretrained(MODEL)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL)
    classifier = pipeline("text-classification", model=model, tokenizer=tokenizer)
    logger.info("✅ Text classification model loaded successfully")
except Exception as e:
    logger.error(f"❌ Failed to load text model: {e}")
    classifier = None

def classify_email_or_sms(text):
    """
    Classify email or SMS content as phishing or benign
    
    Args:
        text (str): The text content to classify
        
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
        # Preprocess text (limit length for model)
        processed_text = text[:512]
        
        # Get prediction
        prediction = classifier(processed_text)[0]
        
        # Map labels (handle different label formats)
        pred_label = prediction["label"].lower()
        label = "phishing" if ("phishing" in pred_label or "label_1" in pred_label) else "benign"
        confidence = float(prediction["score"])
        
        # Analyze text for additional risk indicators
        risk_indicators = []
        
        # Check for common phishing patterns
        urgent_words = ["urgent", "immediate", "expire", "suspend", "verify", "confirm", "click here"]
        if any(word in text.lower() for word in urgent_words):
            risk_indicators.append("Urgency indicators detected")
            
        # Check for suspicious links
        if re.search(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\$$\$$,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', text):
            risk_indicators.append("External links detected")
            
        # Check for financial terms
        financial_terms = ["bank", "account", "payment", "credit card", "paypal", "bitcoin"]
        if any(term in text.lower() for term in financial_terms):
            risk_indicators.append("Financial content detected")
            
        # Check for personal info requests
        personal_terms = ["ssn", "social security", "password", "pin", "personal information"]
        if any(term in text.lower() for term in personal_terms):
            risk_indicators.append("Personal information request")
        
        return {
            "label": label,
            "score": confidence,
            "reason": f"DistilBERT v2.4.1 phishing model (confidence: {confidence:.3f})",
            "risk_indicators": risk_indicators,
            "text_length": len(text),
            "model_version": "distilbert-v2.4.1"
        }
        
    except Exception as e:
        logger.error(f"Text classification error: {e}")
        return {
            "label": "error",
            "score": 0.0,
            "reason": f"Classification failed: {str(e)}"
        }
