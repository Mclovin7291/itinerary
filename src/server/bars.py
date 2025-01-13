import requests
import json
from flask import Flask, jsonify

app = Flask(__name__)
api_key = "AIzaSyA4vgx9W72b65Pdn-9OMPxH_llPffwriXc"

def get_bars(coordinates, desired_price,radius):
    location = coordinates
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={location}&radius={radius}&type=bar&key={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        data = json.loads(response.text)
        bars = data["results"]
        name_price_dict = {}
        for bar in bars:
            name = bar["name"]
            price_band = bar.get("price_level", "N/A")
            name_price_dict[name] = price_band
    else:
        print(f"Request failed with status code {response.status_code}")
    preference_output = []
    for key, value in name_price_dict.items():
        if value == desired_price:
            preference_output.append(key)
    return preference_output if preference_output else "there are no bars at this price range in your radius"
