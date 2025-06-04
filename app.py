from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import os


load_dotenv()


api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("❌ Error: Gemini API Key is missing!")
    exit()

genai.configure(api_key=api_key)

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    if not user_input:
        return jsonify({"reply": "Please type something!"})

    try:
        model = genai.GenerativeModel("models/gemini-2.0-flash-001")
        response = model.generate_content(user_input)
        
        if hasattr(response, "text"):
            return jsonify({"reply": response.text})
        else:
            return jsonify({"reply": "Unexpected response format from Gemini API."})
    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=True)

