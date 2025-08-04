# download_models.py - Enhanced Model Downloader
from transformers import (
    BertTokenizerFast,
    BertForSequenceClassification,
    AutoTokenizer,
    AutoModelForSequenceClassification
)
import os
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def download_models():
    """Download and cache all required models for AccountGuard AI"""
    
    models = [
        {
            "name": "URL Phishing Classifier",
            "model_id": "CrabInHoney/urlbert-tiny-v4-phishing-classifier",
            "tokenizer_class": BertTokenizerFast,
            "model_class": BertForSequenceClassification
        },
        {
            "name": "Email/SMS Phishing Classifier", 
            "model_id": "cybersectony/phishing-email-detection-distilbert_v2.4.1",
            "tokenizer_class": AutoTokenizer,
            "model_class": AutoModelForSequenceClassification
        }
    ]
    
    logger.info("🚀 Starting AccountGuard AI model download...")
    
    for model_info in models:
        try:
            logger.info(f"📥 Downloading {model_info['name']}: {model_info['model_id']}")
            
            # Download tokenizer
            logger.info("  ├── Downloading tokenizer...")
            tokenizer = model_info['tokenizer_class'].from_pretrained(model_info['model_id'])
            
            # Download model
            logger.info("  ├── Downloading model...")
            model = model_info['model_class'].from_pretrained(model_info['model_id'])
            
            logger.info(f"  └── ✅ {model_info['name']} downloaded successfully!")
            
        except Exception as e:
            logger.error(f"  └── ❌ Failed to download {model_info['name']}: {e}")
            continue
    
    logger.info("🎉 Model download process completed!")
    logger.info("🔧 You can now start the AccountGuard AI backend with: python app.py")

if __name__ == "__main__":
    download_models()
