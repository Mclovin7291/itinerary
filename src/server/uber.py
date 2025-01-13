import requests
import json

# def get_estimate():
#   url = "https://api.uber.com/v1/guests/trips/estimates"

#   payload = "{
#       "pickup":{
#           "latitude":{{start_latitude}},
#           "longitude":{{start_longitude}}
#           },
#       "dropoff":{
#               "latitude":{{end_latitude}},
#               "longitude":{{end_longitude}}
#           }
#       }"
#   headers = {
#     'Content-Type': 'application/json',
#     'Authorization': 'Bearer {{access_token}}'
#   }
#   response = requests.request("POST", url, headers=headers, data=payload)
#   print(response.text)
#   return(response.text)

def get_trip():
  url = "https://api.uber.com/v1/guests/trips/{{trip_id}}"
  payload={}
  headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {{access_token}}'
  }
  response = requests.request("GET", url, headers=headers, data=payload)
  print(response.text)
  return(response.text)

get_trip