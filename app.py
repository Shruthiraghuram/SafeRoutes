from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# Dummy function for safe route calculation (replace with actual AI/ML model)
def calculate_safe_route(origin, destination):
    # In actual implementation, use real data on crowd, lighting, and crime to calculate safer route
    return [
        {'lat': origin['lat'], 'lng': origin['lng']},
        {'lat': destination['lat'], 'lng': destination['lng']}
    ]

@app.route('/safe-route', methods=['POST'])
def safe_route():
    data = request.get_json()
    origin = data['origin']
    destination = data['destination']
    
    # Call the safe route function
    route = calculate_safe_route(origin, destination)
    
    return jsonify({'route': route})

if __name__ == '__main__':
    app.run(port=5000)
