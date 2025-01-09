from flask import Flask, send_from_directory
from flask_cors import CORS


app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")
# app.config["DEBUG"] = False 
CORS(app)


# Serve the React frontend
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

# API or other backend routes go here (example)
@app.route("/api/data")
def get_data():
    return {"message": "Hello from Flask!"}

if __name__ == "__main__":
    app.run()  # Make sure to run in development mode for now
