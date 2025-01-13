import logging
import requests
from urllib.parse import quote, unquote

logger = logging.getLogger(__name__)

def get_coords(street, city, state, zipcode):
    try:
        # Print raw input values
        print(f"Raw inputs - street: {street}, city: {city}, state: {state}, zip: {zipcode}")

        # Decode URL-encoded parameters
        street = unquote(street)
        city = unquote(city)
        state = unquote(state).upper()
        zipcode = unquote(zipcode)

        print(f"Decoded inputs - street: {street}, city: {city}, state: {state}, zip: {zipcode}")

        # Format address for Google Geocoding API
        formatted_address = quote(f"{street}, {city}, {state} {zipcode}")
        api_key = "AIzaSyA4vgx9W72b65Pdn-9OMPxH_llPffwriXc"
        url = f"https://maps.googleapis.com/maps/api/geocode/json?address={formatted_address}&key={api_key}"
        
        print(f"Making request to URL: {url}")
        response = requests.get(url)
        data = response.json()
        print(f"Google API Response: {data}")
        
        if response.status_code == 200 and data.get('status') == 'OK' and data.get('results'):
            location = data['results'][0]['geometry']['location']
            coordinates = f"{location['lat']},{location['lng']}"
            print(f"Successfully got coordinates: {coordinates}")
            return coordinates
        else:
            print(f"Failed to get coordinates. Status: {data.get('status')}, Error: {data.get('error_message', 'Unknown error')}")
            return None

    except Exception as e:
        print(f"Exception occurred: {str(e)}")
        return None

# Test the function directly
if __name__ == "__main__":
    test_coords = get_coords("2535 layton drive", "lithonia", "GA", "30058")
    print(f"Test coordinates result: {test_coords}")