# app.py (Flask backend)
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 🛡️ allow cross-origin requests from Next.js

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    print("Received data:", data)

    # Do something with the data...
    return jsonify({"status": "success", "message": "Data received"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
