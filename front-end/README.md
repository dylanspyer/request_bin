Front-end Documentation

# May 27

## App.jsx

- Created state `requests` to store all of the current requests
  - we populate this from the `useEffect` hook that runs when the website starts
  - It pulls data from the json server
- The services components (requests and requestData) get data from the json server
- Built components for the left side and right side of the application

## Components/RequestList (Left Side of display)

- lists all of the requests populated by the useEffect hook
- lists them unordered list, of buttons
- When the user clicks the button, it changes the state of the `selectedRequestDetails`
  - This is done by doing a `get` request to the json server, to get the corresponding request Data that matches our request
  - checks the `RequestData` route
- The `selectedRequestDetails` is then updated

## Components/RequestDetails (Right Side of display)

- Displays default info if no request has yet been selected, i.e., `selectedRequestDetails` is `null`
- Once a request is selected (clicked), remove default info and display the header and body to the page

## Services Folder

- `requests` gets all requests from the temp JSON server
- `requestData` gets the request data of the selected request by filtering by `id`


## JSON server

- Created JSON temp server with stock data for testing before connecting to the backend
  - To run JSON server, enter into the terminal: npx json-server --port 3001 --watch db.json
- `requests` mirrors Postgres database
  - This database contains all of the requests
- `requestData` mirrors MongoDB database
  - This database contains the individual request information

# May 28

- Added functionality that where if you click the same item twice, it returns to `null` state
  - AKA, it shows the default view on the RHS
- Revised names from `requestData` to `mongoRequestData` for added clarity on data pulled from Mongo vs data pulled from Postgres
- Refactored `RequestDetails.jsx` for more clarity on what will be output to the screen
- Revised `db.json` to use a hash of hashes for the MongoDB data, where the `key` is the MongoDB object's `id`
- Revised `db.json` to use a hash of hashes in `pgdata`, where the key of the inner hash is the webhook
token and the value is the array of requests- Created landing page before user has a webhook token
  - User will be prompted to click a button which will create a webhook token
  - currently just a generic string
- Created default page when webhook token is provided by code or by url path
  - Webhook token is then stored in the `webhookToken` state variable
- Added index.css with minor CSS for clarity -> namely, columns for the LHS & RHS on main page

## Todo

- sort out error when user enters an invalid webhook token in the url
- When the database is set up, we'll need to change some of the services files to work with the actual db instead of `db.json`