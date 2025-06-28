# smds.py
from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

# Registered SM-DP+ nodes (tower nodes)
smdp_nodes = []

@app.route("/register_smdp", methods=["POST"])
def register_smdp():
    data = request.get_json()
    if not data or "name" not in data or "url" not in data:
        return jsonify({"error": "Missing name or url"}), 400

    # Check if already registered
    existing = next((node for node in smdp_nodes if node["name"] == data["name"]), None)
    if existing:
        existing.update(data)
        existing["last_seen"] = datetime.utcnow().isoformat()
    else:
        data["last_seen"] = datetime.utcnow().isoformat()
        smdp_nodes.append(data)

    return jsonify({"message": f"SM-DP+ node {data['name']} registered"}), 201

@app.route("/discover/<carrier_name>", methods=["GET"])
def discover_smdp(carrier_name):
    # For simplicity: return first node matching carrier name or any node if none found
    for node in smdp_nodes:
        if node.get("carrier") == carrier_name:
            return jsonify({"smdp_url": node["url"]})
    if smdp_nodes:
        return jsonify({"smdp_url": smdp_nodes[0]["url"]})
    return jsonify({"error": "No SM-DP+ nodes available"}), 404

@app.route("/smdp_nodes", methods=["GET"])
def list_nodes():
    return jsonify(smdp_nodes)

if __name__ == "__main__":
    app.run(port=6000)
