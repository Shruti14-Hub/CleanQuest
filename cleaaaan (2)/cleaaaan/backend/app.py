from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os
import re
from flask_cors import CORS
from werkzeug.utils import secure_filename  # For handling file uploads

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from the frontend

# Configure upload folder
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# AI API configuration
AI_API_URL = "https://api.studio.nebius.com/v1/chat/completions"
AI_API_KEY = os.getenv("AI_API_KEY")

if not AI_API_KEY:
    raise ValueError("API key is missing! Set AI_API_KEY in your .env file.")

# Helper function to extract cleanliness percentage from AI response
def extract_cleanliness_percentage(text):
    """Extract percentage value from the AI response"""
    match = re.search(r'(\d{1,3})%', text)
    return int(match.group(1)) if match else None

# Endpoint to compare images
@app.route('/compare_images', methods=['POST'])
def compare_images():
    try:
        # Ensure the request is JSON or multipart
        if not request.is_json and not request.files:
            return jsonify({"error": "Request must be JSON or include files"}), 400

        # Parse the JSON request
        data = request.get_json() if request.is_json else {}
        img_url_before = data.get("img_url_before")
        img_url_after = data.get("img_url_after")
        live_location = data.get("live_location")  # Optional live location as a string

        # Handle file upload for live location
        location_file = request.files.get("location_file")
        if location_file:
            filename = secure_filename(location_file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            location_file.save(file_path)
            live_location = f"File uploaded to {file_path}"

        # Validate input
        if not img_url_before or not img_url_after:
            return jsonify({"error": "Both image URLs are required"}), 400

        # AI prompt for comparison
        prompt = f"""
        Compare these two images and calculate the cleanliness improvement percentage. 
        Respond ONLY with the percentage number followed by the % symbol. 
        Example: '75%'. 
        Location: {live_location if live_location else 'Not provided'}
        """

        # Payload for the AI API
        payload = {
            "model": "Qwen/Qwen2-VL-72B-Instruct",
            "messages": [
                {"role": "user", "content": prompt},
                {"role": "user", "content": f"Image before: {img_url_before}"},
                {"role": "user", "content": f"Image after: {img_url_after}"}
            ],
            "max_tokens": 50,
            "temperature": 0.1
        }

        # Headers for the AI API request
        headers = {
            "Authorization": f"Bearer {AI_API_KEY}",
            "Content-Type": "application/json"
        }

        # Send request to the AI API
        response = requests.post(AI_API_URL, json=payload, headers=headers, timeout=30)
        response.raise_for_status()

        # Parse the AI API response
        ai_response = response.json()
        choices = ai_response.get("choices", [])
        if not choices or "message" not in choices[0]:
            return jsonify({
                "status": "error",
                "message": "Invalid AI response format",
                "ai_response": ai_response
            }), 400

        full_response = choices[0]["message"].get("content", "")

        # Extract cleanliness percentage
        cleanliness_percentage = extract_cleanliness_percentage(full_response)

        if cleanliness_percentage is None:
            return jsonify({
                "status": "error",
                "message": "Could not determine cleanliness percentage",
                "ai_response": full_response
            }), 400

        # Return the result with location
        return jsonify({
            "status": "success",
            "cleanliness_percentage": cleanliness_percentage,
            "comparison_result": f"The area is {cleanliness_percentage}% cleaner.",
            "live_location": live_location
        })

    except requests.exceptions.RequestException as req_err:
        return jsonify({"error": "AI service unavailable", "details": str(req_err)}), 503
    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500
from flask import Flask, request, jsonify
from register_user import register_user

app = Flask(__name__)

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    try:
        register_user(username, email, password)
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)