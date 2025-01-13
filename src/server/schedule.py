from restaurants import get_restaurants
from bars import get_bars
from shopping_malls import get_shopping
import random


def set_schedule(coordinates, desired_price, radius):
    schedule = {
        "12:00 PM": "",
        "1:00 PM": "",
        "2:00 PM": "",
        "3:00 PM": "",
        "4:00 PM": "",
        "5:00 PM": "",
        "6:00 PM": "",
        "8:00 PM": ""
    }

    restaurants = get_restaurants(coordinates, desired_price, radius)
    shopping = get_shopping(coordinates, radius)
    bars = get_bars(coordinates, desired_price, radius)

    schedule["12:00 PM"] = restaurants[0] if isinstance(restaurants, list) else restaurants
    schedule["2:00 PM"] = shopping[0] if isinstance(shopping, list) else shopping
    schedule["8:00 PM"] = bars[0] if isinstance(bars, list) else bars

    return schedule

print(set_schedule("34.00314,-84.08807", 2, 5000))