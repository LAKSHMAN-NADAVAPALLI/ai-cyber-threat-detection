from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os, jwt, datetime, logging, re
from functools import wraps

# Load environment variables
load_dotenv()

app = Flask(__name__)

# ✅ CORS setup for your frontend domain
CORS(app,
     resources={r"/*": {"origins": [
         "https://nadavapalli-lakshman-ai-cyber-threat-detection.vercel.app",
         "https://backend-edwk.onrender.com",
         "http://localhost:3000"
     ]}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"])

# JWT secret (must match the secret used in Spring Boot)
JWT_SECRET = os.getenv("JWT_SECRET")
if not JWT_SECRET:
    raise ValueError("❌ JWT_SECRET not set in environment variables!")

# Logging setup
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
            # ✅ Verify token — do not check DB, just trust Spring Boot issued it
            jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired!"}), 403
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token!"}), 403
        except Exception as e:
            return jsonify({"error": str(e)}), 500

        return f(*args, **kwargs)

    return decorated_function

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "AI Server is working!"})

@app.route('/predict', methods=['POST'])
@token_required
def predict():
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
