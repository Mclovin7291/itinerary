import requests
import json
from flask import Flask, jsonify
app = Flask(__name__)

# API key, global variable
api_key = "AIzaSyA4vgx9W72b65Pdn-9OMPxH_llPffwriXc"

# Location coordinates
# get location from the frontend input must be in "lat,long" format

def get_restaurants(coordinates, desired_price,radius):
    location = coordinates

    # google places API used here
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={location}&radius={radius}&type=restaurant&key={api_key}"

    # Make the google API request
    response = requests.get(url)

    # Check if the request was successful and create restaurant price dictionary
    if response.status_code == 200:
        # Parse the JSON response
        data = json.loads(response.text)

        # Get the list of restaurants
        restaurants = data["results"]

        # create a dict to store restaurants and price bands
        name_price_dict = {}
        for restaurant in restaurants:
            name = restaurant["name"]
            price_band = restaurant.get("price_level", "N/A")
            name_price_dict[name] = price_band

    else:
        # Handle the error
        print(f"Request failed with status code {response.status_code}")

    preference_output = []
    for key, value in name_price_dict.items():
        if value == desired_price:
            preference_output.append(key)

    return preference_output if preference_output else "there are no restaurants at this price range in your radius"