import os
import jwt

# Retrieve environment variables or use defaults if not available
HASURA_SECRET = os.getenv('HASURA_SECRET', '123456789')
USER_ID = os.getenv('USER_ID', '0')
ROLE = os.getenv('ROLE', 'candidate')

# JWT payload
payload = {
    "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": ROLE,
        "x-hasura-allowed-roles": [ROLE],
        "x-hasura-user-id": USER_ID
    }
}

# Generate the JWT token
encoded_jwt = jwt.encode(payload, HASURA_SECRET, algorithm='HS256')

print(encoded_jwt)
