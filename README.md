# AccountGuard AI

**AccountGuard AI** is a specialized security tool designed for cybersecurity analysts working in financial institutions. It enables analysts to detect suspicious activity by analyzing transaction data and phishing emails—all from a single interface.

---

## 🔍 Key Features

### 1. Email Phishing Detection

* Upload any suspicious email.
* Analyzes content using HuggingFace models:

  * [`cybersectony/phishing-email-detection-distilbert_v2.4.1`](https://huggingface.co/cybersectony/phishing-email-detection-distilbert_v2.4.1)
  * [`CrabInHoney/urlbert-tiny-v4-phishing-classifier`](https://huggingface.co/CrabInHoney/urlbert-tiny-v4-phishing-classifier)
* Use case: Analysts can quickly check user-reported emails that may be part of an attack campaign.

### 2. Transaction Fraud Detection

* Upload financial transaction data.
* Identifies anomalous transactions based on patterns in:

  * Amount, Product Code, Card details, Address, Distance, Device Info, etc.
* Enables analysts to correlate suspicious emails with transaction activity.

---

## 🌟 What Makes This Unique

We **trained our own machine learning model** on the **IEEE-CIS Fraud Detection dataset**, making this one of the **first real-time tools to use that dataset for live fraud detection**.

Unlike off-the-shelf solutions, this project features:

* A custom `IsolationForest` model tuned for practical anomaly detection
* Data preprocessing and transformation pipelines
* Integration with a real-time API via FastAPI

No existing model from HuggingFace or other public repositories was trained on this type of transactional data for fraud detection. This is a **ground-up, custom-trained model** tailored for financial institutions.

---

## ⚙️ Tech Stack

* **Frontend**: Next.js, Tailwind CSS
* **Backend**: FastAPI, Python
* **ML Models**: Scikit-learn, HuggingFace Transformers

---

## 📂 Project Structure

```
AccountGuard-AI/
├── frontend/        # Next.js + Tailwind frontend
├── backend/         # FastAPI backend with custom ML models
├── .gitignore
└── README.md
```

---

## 🚚 Setup Guide

### 1. Clone the repository

```bash
git clone https://github.com/sameerwire/AccountGuard-AI.git
cd AccountGuard-AI
```

### 2. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Run Backend

```bash
cd ../backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 🔢 Example Usage

### Email:

```
Subject: Urgent Account Verification
Body: Please confirm your credentials at http://fakebank.com
```

### Transaction:

```json
{
  "amount": 120.50,
  "product_cd": "w",
  "card1": 11109,
  "card2": 404.0,
  "card3": 150.0,
  "card4": "visa",
  "card5": 226.0,
  "addr1": 330.0,
  "dist1": 10.0,
  "device_type": "desktop",
  "device_info": "windows"
}
```

---

## 📤 .gitignore Notes

* `node_modules/`, `.next/`, `venv/`, `.env`, `*.log`, and large dataset/model files are excluded
* Model training datasets from IEEE-CIS are not pushed to GitHub

---

## 📖 License

This project is open source under the MIT License. Feel free to fork, modify, and share!
