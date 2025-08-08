from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os, bcrypt, jwt, datetime, logging
from functools import wraps
import re
import logging
from flask import request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
# Optional: Slack alert function
import requests
# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Setup
client = MongoClient(os.getenv("MONGO_URI"))
db = client['ai_cyber_threat']  # Database name
users = db['users']

# JWT secret
JWT_SECRET = os.getenv("JWT_SECRET")

# Set up logging
logging.basicConfig(level=logging.INFO)

# Decorator to require JWT authentication
def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({"error": "Token is missing!"}), 403

        try:
            data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            current_user = users.find_one({"username": data["username"]})
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired!"}), 403
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token!"}), 403

        return f(current_user, *args, **kwargs)

    return decorated_function

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password'].encode('utf-8')

    if users.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 400

    hashed = bcrypt.hashpw(password, bcrypt.gensalt())
    users.insert_one({"username": username, "password": hashed})
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = users.find_one({"username": data['username']})

    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode({
        "username": user['username'],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, JWT_SECRET, algorithm="HS256")

    return jsonify({"token": token})

@app.route('/test', methods=['GET'])
def test():
    return "AI Server is working!"





@app.route('/predict', methods=['POST'])
@token_required
def predict(current_user):
    import re
    logging.info("✅ /predict endpoint hit.")

    try:
        data = request.get_json()
        logging.info("📦 Data received: %s", data)

        if not data or 'input' not in data:
            return jsonify({"error": "Missing 'input' field in JSON"}), 400

        user_input = data['input'].lower()

        cleaned_input = re.sub(r'[^\w\s]', '', user_input)
        tokens = set(cleaned_input.split())

        threat_patterns = {
            "malware": [r"\bmalware\b", r"\bmalicious software\b"],
            "phishing": [r"\bphishing\b", r"\bphishing email\b"],
            "ddos": [r"\bddos\b", r"\bdenial of service\b", r"\bflood attack\b"],
            "exploit": [r"\bexploit\b", r"\bvulnerability exploited\b"],
            "ransomware": [r"\bransomware\b", r"\bdata encrypted\b"],
            "virus": [r"\bvirus\b", r"\binfected system\b"],
            "trojan": [r"\btrojan\b", r"\btrojan horse\b"],
            "botnet": [r"\bbotnet\b", r"\bnetwork of bots\b"],
            "backdoor": [r"\bbackdoor\b", r"\bunauthorized access\b"],
            "spyware": [r"\bspyware\b", r"\btracking software\b"],
            "keylogger": [r"\bkeylogger\b", r"\bkeystroke logger\b"]
        }

        found_threats = []

        for threat, patterns in threat_patterns.items():
            for pattern in patterns:
                if re.search(pattern, user_input):
                    found_threats.append(threat)
                    break

        if found_threats:
            prediction = f"⚠ Potential Threat Detected: {', '.join(set(found_threats))}"
            confidence = round(0.3 + 0.01 * len(found_threats), 2)
        else:
            prediction = "✅ No known threats detected in the input."
            confidence = round(0.9 + 0.01 * len(found_threats), 2)

        logging.info(f"📊 Prediction: {prediction} | Confidence: {confidence}")

        return jsonify({
            "prediction": prediction,
            "found_threats": list(set(found_threats)),
            "confidence": confidence
        })

    except Exception as e:
        logging.exception("❌ Error in /predict route")
        return jsonify({"error": str(e)}), 500




if __name__ == '__main__':
    print("🔍 Registered Flask routes:")
    for rule in app.url_map.iter_rules():
        print(f"{rule.endpoint}: {rule}")

    app.run(port=5000)