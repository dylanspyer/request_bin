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

