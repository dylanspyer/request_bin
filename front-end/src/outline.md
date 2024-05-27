# Top Bar
  - Logo on left
  - Endpoint and easy way to copy it

# Left Side
  - list of requests
    - Time
    - Method
    - path
  
  - state object
    - {
      - time, 
      - method,
      - path,
      - request_id (points to mongo db)
    - }

  - how to do utc time

# Right Side
  - Endpoint
  - Stock information upon start up (no request on left has been clicked)
  - the request information (after request is clicked)
    - we need to do get request to the server with mongo_id
