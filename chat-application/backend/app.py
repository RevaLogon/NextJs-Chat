from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

with open("users.json", "r") as f:
    users = json.load(f)

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = next((u for u in users if u["username"] == username and u["password"] == password), None)

    if user:
        return jsonify({"success": True, "role": user["role"]})
    return jsonify({"success": False}), 401

@app.route("/banned_words", methods=["GET", "POST"])
def manage_banned_words():
    with open("banned_words.json", "r") as f:
        banned_words = json.load(f)

    if request.method == "GET":
        return jsonify(banned_words)
    elif request.method == "POST":
        word = request.json.get("word")
