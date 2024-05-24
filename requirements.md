## General Workflow

- user goes to website landing page
- user clicks 'create a public bin'
  - a url is created that the user can gives to url
  - a path is auto generated for the path
    - we can use a library that already makes them
    -
- user is re-routed to page that contains
  - the endpoint they created
  - a UI to observe requests sent to that endpoint

## Technical Concerns

- need a unique path for each
- landing page: www.ourwebsite.com/
  - redirected to: www.ourwebsite.com/<random_webhook_token>
  - webhooks: www.ourwebsite.com/<random_webhook_token>
- set up paths within the React app, not within nginx site-enabled

www.requestbin.com
cookie on my machine that gives me a unique_id
that unique_id is tied to my webhook that we created
that will display all my webhooks

www.uniqueidentifer.requestbin.com
www.requestbin/uniqueidentifier

## Basic Requirements

- a user should be able to create a unique bin
  - post request to our server to add unique bin record
  - store the id in the database
  - generate the unique ids – each bin should be associated with two urls:
    - one for sending requests to the bin
      - www.ourwebsite.com/<random_webhook_token>
        - use encryption library (bcrypt?)
    - one for viewing requests made to the bin
      - www.ourwebsite.com/display/<random_webhook_token>
- when requests are made to the bin, the request method, path, headers, and body should be displayed on the UI
  - query to retrieve the method, path, headers, body, from all requests
  - store this data in the url table
- a list of total requests made to a bin should be visible to the user
  - we can have a count that counts the number of requests made to the url and store it in the url table
- the user should be able to click past requests from this list and view data for that request
- bin and request data should be stored in PostgreSQL, request payload data should be stored in MongoDB

  - headers in SQL
    PostgreSQL
    Path(string) | Method(string) | Created_at(utc_date) | Request_id(mongo) | ...Headers

    Mongo_DB
    request_id() | headers| payload

  - body (payload) in MongoDB

- the application should be deployed to one team member's VPS instance

### Database Concerns:

options:
standard columns in posgres for all heads, null values where they don't exist
put the whole thing in mongo, identifier on posgres to link to mongo
omit some headers on posgres
---this option---:standard headers in column posgres, other headers in jsob postgres, payload (body) in mongo

### Optional Requirements

associate a user with a specific bin, so that the same visitor can navigate back to the same bin after closing and reopening the window.
implement real-time functionality by having requests show up on the UI without a page refresh
implement some mechanism for cleaning up requests and/or bins over time
implement your front end using React to prepare for weeks 5-8
create an easy way for your user to copy the endpoint or make requests
for example, clicking a button to copy the endpoint, or a feature that let's you make custom requests from within the request bin page.
