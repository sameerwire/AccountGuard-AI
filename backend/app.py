from fastapi import FastAPI, Request, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from phishing_url import classify_url
from phishing_text import classify_email_or_sms
from pymongo import MongoClient
from datetime import datetime
import uvicorn

app = FastAPI(title="AccountGuard AI - Advanced Phishing Detection API", version="2.0.0")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup with error handling
try:
    client = MongoClient("mongodb://localhost:27017", serverSelectionTimeoutMS=5000)
    client.server_info()  # Test connection
    db = client["accountguard_ai"]
    log_collection = db["threat_logs"]
    analytics_collection = db["analytics"]
    print("✅ Connected to MongoDB successfully")
except Exception as e:
    print(f"⚠️ MongoDB connection failed: {e}")
    print("📝 Continuing without database logging...")
    client = None
    db = None
    log_collection = None
    analytics_collection = None

@app.get("/")
async def root():
    return {
        "message": "🛡️ AccountGuard AI - Advanced Threat Detection API",
        "version": "2.0.0",
        "status": "operational",
        "endpoints": {
            "phishing_url": "/phishing/url",
            "phishing_text": "/phishing/text",
            "analytics": "/analytics",
            "logs": "/logs"
        }
    }

@app.post("/phishing/url")
async def detect_phishing_url(url: str = Body(..., embed=True)):
    try:
        result = classify_url(url)
        
        # Enhanced logging with metadata
        if log_collection is not None:
            log_entry = {
                "input_type": "url",
                "input_data": url,
                "prediction": result["label"],
                "confidence_score": result["score"],
                "model_reason": result["reason"],
                "timestamp": datetime.utcnow(),
                "threat_level": "high" if result["label"] == "phishing" and result["score"] > 0.8 else "medium" if result["label"] == "phishing" else "low",
                "source_ip": "127.0.0.1",  # In production, get from request
                "user_agent": "AccountGuard-Dashboard"
            }
            log_collection.insert_one(log_entry)
        
        return {
            "type": "url",
            "input": url,
            "result": result,
            "timestamp": datetime.utcnow().isoformat(),
            "api_version": "2.0.0"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"URL analysis failed: {str(e)}")

@app.post("/phishing/text")
async def detect_phishing_text(body: str = Body(..., media_type="text/plain")):
    try:
        result = classify_email_or_sms(body)
        
        # Enhanced logging with metadata
        if log_collection is not None:
            log_entry = {
                "input_type": "text",
                "input_data": body[:500],  # Limit stored text length
                "prediction": result["label"],
                "confidence_score": result["score"],
                "model_reason": result["reason"],
                "timestamp": datetime.utcnow(),
                "threat_level": "high" if result["label"] == "phishing" and result["score"] > 0.8 else "medium" if result["label"] == "phishing" else "low",
                "content_length": len(body),
                "source_ip": "127.0.0.1",
                "user_agent": "AccountGuard-Dashboard"
            }
            log_collection.insert_one(log_entry)

        return {
            "type": "text",
            "input": body[:100] + "..." if len(body) > 100 else body,
            "result": result,
            "timestamp": datetime.utcnow().isoformat(),
            "api_version": "2.0.0"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Text analysis failed: {str(e)}")

@app.get("/logs")
async def get_logs(limit: int = 20, threat_level: str = None):
    if log_collection is None:
        return {"logs": [], "message": "Database not available"}
    
    try:
        # Build query filter
        query = {}
        if threat_level:
            query["threat_level"] = threat_level
        
        # Get logs with enhanced data
        logs = list(log_collection.find(query).sort("timestamp", -1).limit(limit))
        
        # Convert ObjectId and datetime to strings
        for log in logs:
            log["_id"] = str(log["_id"])
            log["timestamp"] = log["timestamp"].isoformat()
        
        return {
            "logs": logs,
            "total_count": log_collection.count_documents(query),
            "query_limit": limit
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve logs: {str(e)}")

@app.get("/analytics")
async def get_analytics():
    if log_collection is None:
        return {"analytics": {}, "message": "Database not available"}
    
    try:
        # Calculate analytics from logs
        total_scans = log_collection.count_documents({})
        phishing_detected = log_collection.count_documents({"prediction": "phishing"})
        high_threats = log_collection.count_documents({"threat_level": "high"})
        
        # Recent activity (last 24 hours)
        from datetime import timedelta
        yesterday = datetime.utcnow() - timedelta(days=1)
        recent_scans = log_collection.count_documents({"timestamp": {"$gte": yesterday}})
        
        # Threat distribution
        url_scans = log_collection.count_documents({"input_type": "url"})
        text_scans = log_collection.count_documents({"input_type": "text"})
        
        return {
            "analytics": {
                "total_scans": total_scans,
                "phishing_detected": phishing_detected,
                "high_threats": high_threats,
                "recent_scans_24h": recent_scans,
                "detection_rate": round((phishing_detected / total_scans * 100), 2) if total_scans > 0 else 0,
                "scan_distribution": {
                    "url_scans": url_scans,
                    "text_scans": text_scans
                }
            },
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate analytics: {str(e)}")

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "database": "connected" if log_collection is not None else "disconnected",
        "models": "loaded"
    }

if __name__ == "__main__":
    print("🚀 Starting AccountGuard AI Backend...")
    print("📊 Dashboard will be available at: http://localhost:8000")
    print("🔗 API Documentation: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
