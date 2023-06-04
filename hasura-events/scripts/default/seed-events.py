import os
import requests
import json
from random import randint
from datetime import datetime, timedelta

# Get the values from environment variables
HASURA_GRAPHQL_ENDPOINT = os.getenv("HASURA_GRAPHQL_ENDPOINT")
HASURA_GRAPHQL_ADMIN_SECRET = os.getenv("HASURA_GRAPHQL_ADMIN_SECRET")
LIMIT = int(os.getenv("LIMIT", "25"))

# Check if the required environment variables are set
if not HASURA_GRAPHQL_ENDPOINT or not HASURA_GRAPHQL_ADMIN_SECRET:
    print("Error: Missing environment variables.")
    exit(1)

# Generate random football game statistics with event time within the last week
def generate_event():
    event_time = datetime.now() - timedelta(days=randint(1, 7))
    return {
        "created_at": event_time.isoformat(),
        "data": {
            "goals": randint(0, 5),
            "corners": randint(0, 10),
            "fouls": randint(0, 20)
        }
    }

# Generate the specified number of events
events = [generate_event() for _ in range(LIMIT)]

# Prepare the request headers and payload
headers = {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": HASURA_GRAPHQL_ADMIN_SECRET
}
payload = {
    "query": '''
    mutation insertEvents($objects: [events_insert_input!]!) {
      insert_events(objects: $objects) {
        affected_rows
        returning {
          created_at
          data
        }
      }
    }
    ''',
    "variables": {
        "objects": events
    }
}

# Send the request to Hasura API
response = requests.post(HASURA_GRAPHQL_ENDPOINT, headers=headers, data=json.dumps(payload))

# Format the response with 2 characters indentation
formatted_response = json.dumps(json.loads(response.text), indent=2)

# Print the formatted response
print(formatted_response)
