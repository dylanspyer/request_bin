# Backend Documentation

Welcome to the documentation for our backend system. This guide aims to provide comprehensive information about the functionality and usage of the backend services. Below, you will find details on each available route, including their purposes, expected parameters, and returned values.

# Routes

---

## Generate Webhook Token

**Path:** `/api/generateWebhookToken`  
**Method:** `POST`  
**Description:** Generates a unique webhook token and saves it to the database.  
**Request Body:** None  
**Response:**

- `200 OK` with the generated token in the response body.

**Sample `200` Response**

```json
{
  "webHookToken": "958a8baa-10d5-497a-9e01-728513d3c71f"
}
```

**Functionality:**

- Generates a unique token using a uuid generator
- Checks if the token is unique
  - If it is not unique, it generates a token until it is unique
- If the token is unique, saves the token to the database
- Returns the generated token.

---

## Record a Webhook Trigger

**Path:** `/api/request/:webhookToken`  
**Method:** `ALL` (Accepts any HTTP method: GET, POST, PUT, DELETE, etc.)  
**Description:** Records any incoming webhook request, saves its information to the two databases (mongodb, and postgres), and associates it with the given webhook token.  
**Parameters:**

- `webhookToken` (URL parameter): The token identifying the webhook.

**Request Body:** Varies based on the type of request.  
**Response:**

- `200 OK` with the message "Request information saved successfully".
- `401 Unauthorized` if the webhook token is invalid.

**Functionality:**

- Retrieves the `webhookToken` from the URL parameter.
- Checks if the token is valid.
- If the token is valid, extracts the request method and modifies the request path to remove the token.
- Saves the request information in a MongoDB database using
- retrieves the `mongoId` of the data that was just submitted to mongob
  - This is used to link the request between postgres and mongodb
- Stores the incoming request information in the PostgreSQL database

---

## Retrieve All Requests for a Webhook Token

**Path:** `/api/allRequests/:webhookToken`  
**Method:** `GET`  
**Description:** Returns all the requests associated with a specific webhook token.  
**Parameters:**

- `webhookToken` (URL parameter): The token identifying the webhook.

**Request Body:** None  
**Response:**

- `200 OK` with all request data associated with the webhook token.
- `401 Unauthorized` if the webhook token is invalid.

**Sample `200` Response**

```JavaScript
[
  {
    path: "/api/request/f55d7e8d-13fe-4c9b-938a-b11d9a093428",
    method: "POST",
    created_at: "2024-05-28T22:07:28.979Z",
    request_id: "665655a0eb1c7b1e921c211b",
  },
  {
    path: "/api/request/f55d7e8d-13fe-4c9b-938a-b11d9a093428",
    method: "POST",
    created_at: "2024-05-28T22:16:45.696Z",
    request_id: "$2b$10$DlxFmYIa.VcvBZMKwIYd.en7r5JMMOjb7zuxKs/3nhMhQCZephG4O",
  },
];
```

The field `request_id` maps to the corresponding request in mongo_db. It is an alias for `mongo_id` in our postgres database

**Functionality:**

- Retrieves the `webhookToken` from the URL parameter.
- Checks if the `webhookToken` is valid.
  - If it is valid, the `id` of that webhook token is returned
- If the token is valid, retrieves all request data associated with the token using the returned `id` above
- Returns the request data.

---

### Retrieve a Specific Request by MongoDB ID

**Path:** `/api/getSpecificRequest/:mongoId`  
**Method:** `GET`  
**Description:** Returns the details of a specific request stored in MongoDB, identified by its MongoDB ID.  
**Parameters:**

- `mongoId` (URL parameter): The ID of the specific request in MongoDB.

**Request Body:** None  
**Response:**

- `200 OK` with the specific request data.
- `401 Unauthorized` if the request data is not found.

**Sample `200` Response**

```json
{
  "headers": {
    "host": "340a-73-32-179-79.ngrok-free.app",
    "user-agent": "PostmanRuntime/7.37.3",
    "content-length": "46",
    "accept": "*/*",
    "accept-encoding": "gzip, deflate, br",
    "content-type": "text/plain",
    "postman-token": "dd298c87-68ad-4fa9-9f2f-df4465ace100",
    "x-forwarded-for": "73.32.179.79",
    "x-forwarded-host": "340a-73-32-179-79.ngrok-free.app",
    "x-forwarded-proto": "https"
  },
  "path": "/?will=fool&fef=efef",
  "queryParams": {
    "will": "fool",
    "fef": "efef"
  },
  "method": "POST",
  "id": "665671eab620270e1234157b"
}
```

**Functionality:**

- Fetches the specific request data from MongoDB, using the `mongoId` in the url parameter
- If the data is found, returns it in the response.

---

# utils

### config
