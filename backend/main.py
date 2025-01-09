from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")
app.config["DEBUG"] = False  # Disable debug mode


# Serve the React frontend
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

# API or other backend routes go here (example)
@app.route("/api/data")
def get_data():
    return {"message": "Hello from Flask!"}

if __name__ == "__main__":
    app.run(debug=True)  # Make sure to run in development mode for now
