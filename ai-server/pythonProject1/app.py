from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os, bcrypt, jwt, datetime, logging
from functools import wraps
import re

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Setup
try:
    client = MongoClient(os.getenv("MONGO_URI"))
    db = client['ai_cyber_threat']
    users = db['users']
    print("✅ Connected to MongoDB")
except Exception as e:
    print(f"❌ MongoDB Connection Failed: {e}")

# JWT secret
JWT_SECRET = os.getenv("JWT_SECRET")
if not JWT_SECRET:
    raise ValueError("❌ JWT_SECRET not set in environment variables!")

# Set up logging
logging.basicConfig(level=logging.INFO)

# JWT authentication decorator
def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            try:
                token = request.headers['Authorization'].split(" ")[1]
            except IndexError:
                return jsonify({"error": "Invalid Authorization header format"}), 403

        if not token:
            return jsonify({"error": "Token is missing!"}), 403

        try:
            data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            current_user = users.find_one({"username": data["username"]})
            if not current_user:
                return jsonify({"error": "User not found!"}), 404
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired!"}), 403
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token!"}), 403
        except Exception as e:
            return jsonify({"error": str(e)}), 500

        return f(current_user, *args, **kwargs)

    return decorated_function

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json(force=True)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400

        if users.find_one({"username": username}):
            return jsonify({"error": "Username already exists"}), 400

        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        users.insert_one({"username": username, "password": hashed})
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        logging.exception("Error in /register")
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json(force=True)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400

        user = users.find_one({"username": username})
        if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password']):
            return jsonify({"error": "Invalid credentials"}), 401

        token = jwt.encode({
            "username": user['username'],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, JWT_SECRET, algorithm="HS256")

        return jsonify({"token": token})
    except Exception as e:
        logging.exception("Error in /login")
        return jsonify({"error": str(e)}), 500

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "AI Server is working!"})

@app.route('/predict', methods=['POST'])
@token_required
def predict(current_user):
    logging.info("✅ /predict endpoint hit.")
    try:
        data = request.get_json(force=True)
        logging.info(f"📦 Data received: {data}")

        # Accept both "input" and "data" keys
        user_input = data.get('input') or data.get('data')
        if not user_input:
            return jsonify({"error": "Missing 'input' or 'data' field in JSON"}), 400

        user_input = user_input.lower()
        cleaned_input = re.sub(r'[^\w\s]', '', user_input)

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

        found_threats = [
            threat for threat, patterns in threat_patterns.items()
            if any(re.search(pattern, user_input) for pattern in patterns)
        ]

        if found_threats:
            prediction = f"⚠ Potential Threat Detected: {', '.join(set(found_threats))}"
            confidence = round(0.3 + 0.01 * len(found_threats), 2)
        else:
            prediction = "✅ No known threats detected in the input."
            confidence = 0.99

        return jsonify({
            "prediction": prediction,
            "found_threats": found_threats,
            "confidence": confidence
        })

    except Exception as e:
        logging.exception("Error in /predict route")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🔍 Registered Flask routes:")
    for rule in app.url_map.iter_rules():
        print(f"{rule.endpoint}: {rule}")
    app.run(port=5000)
