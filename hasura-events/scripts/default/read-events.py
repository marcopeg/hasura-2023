import os
import requests
import json

# Get the values from environment variables
HASURA_GRAPHQL_ENDPOINT = os.getenv("HASURA_GRAPHQL_ENDPOINT")
HASURA_GRAPHQL_ADMIN_SECRET = os.getenv("HASURA_GRAPHQL_ADMIN_SECRET")
LIMIT = int(os.getenv("LIMIT", "25"))

# Check if the required environment variables are set
if not HASURA_GRAPHQL_ENDPOINT or not HASURA_GRAPHQL_ADMIN_SECRET:
    print("Error: Missing environment variables.")
    exit(1)

# Define the GraphQL query to fetch information with sorting and limit
GRAPHQL_QUERY = '''
{
  events(order_by: {created_at: desc}, limit: %d) {
    created_at
    data
  }
}
''' % LIMIT

# Prepare the request headers and payload
headers = {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": HASURA_GRAPHQL_ADMIN_SECRET
}
payload = {
    "query": GRAPHQL_QUERY
}

# Send the request to Hasura API
response = requests.post(HASURA_GRAPHQL_ENDPOINT, headers=headers, data=json.dumps(payload))

# Format the response with 2 characters indentation
formatted_response = json.dumps(json.loads(response.text), indent=2)

# Print the formatted response
print(formatted_response)
