from flask import Flask, send_from_directory
from flask_cors import CORS
from get_financial_data import get_financial_data
from flask_json import jsonify


app = Flask(__name__, static_folder="../frontend/build", static_url_path="/") 
CORS(app)

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

# API or other backend routes
@app.route("/api/financial-data", methods=["GET"])
def financial_data():
    data = get_financial_data()
    if data:
        return jsonify(data)
    else:
        return jsonify({"error": "Failed to fetch data"}), 500

if __name__ == "__main__":
    app.run(debug=True) 
