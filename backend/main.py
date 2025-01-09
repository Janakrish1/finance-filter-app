from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from get_financial_data import get_financial_data
import os


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
      
@app.route("/api/filter-financial-data", methods=["GET"])
def filter_financial_data():
    data = get_financial_data()
    if not data:
        return jsonify({"error": "Failed to fetch data"}), 500

    from_year = request.args.get("fromYear", type=int)
    to_year = request.args.get("toYear", type=int)
    min_revenue = request.args.get("minRevenue", type=float)
    max_revenue = request.args.get("maxRevenue", type=float)
    min_net_income = request.args.get("minNetIncome", type=float)
    max_net_income = request.args.get("maxNetIncome", type=float)

    print(data)

    filtered_data = []
    for item in data:
        date_year = int(item["date"].split("-")[0])

        if from_year and date_year < from_year:
            continue
        if to_year and date_year > to_year:
            continue

        if min_revenue and item["revenue"] < min_revenue:
            continue
        if max_revenue and item["revenue"] > max_revenue:
            continue

        if min_net_income and item["netIncome"] < min_net_income:
            continue
        if max_net_income and item["netIncome"] > max_net_income:
            continue

        filtered_data.append(item)

    return jsonify(filtered_data)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Use the PORT env variable or default to 5000
    app.run(host="0.0.0.0", port=port, debug=True)
