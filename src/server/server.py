from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_caching import Cache
import logging
from datetime import datetime
from functools import wraps
import os

# Create logs directory first
os.makedirs('logs', exist_ok=True)

# Then configure logging
logging.basicConfig(
    filename=f'logs/api_{datetime.now().strftime("%Y%m%d")}.log',
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

from smartystreets_python_sdk import SharedCredentials, StaticCredentials, exceptions, ClientBuilder
from smartystreets_python_sdk.us_street import Lookup as StreetLookup

from schedule import set_schedule
from coordinates import get_coords

app = Flask(__name__)
CORS(app)  # Enable CORS

# Configure caching
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

# Configure rate limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

def validate_params(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Validate street
        if not kwargs.get('street'):
            abort(400, description="Street address is required")
        
        # Validate state
        state = kwargs.get('state', '').upper()
        if not state or len(state) != 2:
            abort(400, description="Valid two-letter state code is required")
            
        # Validate ZIP code
        zip_code = kwargs.get('zipcode', '')
        if not zip_code.isdigit() or len(zip_code) != 5:
            abort(400, description="Valid 5-digit ZIP code is required")
            
        # Validate radius (in meters)
        try:
            radius = int(kwargs.get('radius', 0))
            if not (1000 <= radius <= 50000):
                abort(400, description="Radius must be between 1000 and 50000 meters")
        except ValueError:
            abort(400, description="Invalid radius value")
            
        # Validate price
        try:
            price = int(kwargs.get('desired_price', 0))
            if not (1 <= price <= 4):
                abort(400, description="Price must be between 1 and 4")
        except ValueError:
            abort(400, description="Invalid price value")
            
        return f(*args, **kwargs)
    return decorated_function

@app.errorhandler(400)
def bad_request(error):
    logger.error(f"Bad Request: {error.description}")
    return jsonify(error=error.description), 400

@app.errorhandler(429)
def ratelimit_handler(error):
    logger.warning(f"Rate Limit Exceeded: {error.description}")
    return jsonify(error="Rate limit exceeded. Please try again later."), 429

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal Server Error: {str(error)}")
    return jsonify(error="An internal server error occurred."), 500

@app.route('/parameters/<street>/<city>/<state>/<zipcode>/<radius>/<int:desired_price>')
@validate_params
def get_schedule(street, city, state, zipcode, radius, desired_price):
    try:
        logger.info(f"Received request with parameters: {street}, {city}, {state}, {zipcode}, {radius}, {desired_price}")
        
        # Log the raw parameters
        logger.info(f"Raw street: {street}")
        logger.info(f"Raw city: {city}")
        logger.info(f"Raw state: {state}")
        logger.info(f"Raw zipcode: {zipcode}")
        
        coordinates = get_coords(street, city, state, zipcode)
        
        if not coordinates:
            logger.error("Geocoding failed - no coordinates returned")
            return jsonify(error="Unable to geocode address - please check your address and try again"), 400
            
        logger.info(f"Successfully got coordinates: {coordinates}")
        
        schedule = set_schedule(coordinates, desired_price, radius)
        if not schedule:
            logger.error("Schedule generation failed")
            return jsonify(error="Unable to generate schedule"), 400
            
        logger.info("Successfully generated schedule")
        return jsonify(schedule)
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify(error=f"An error occurred while processing your request: {str(e)}"), 500

# Health check endpoint
@app.route('/health')
def health_check():
    return jsonify(status="healthy", timestamp=datetime.now().isoformat())

if __name__ == '__main__':
    # Run the app
    app.run(debug=True)