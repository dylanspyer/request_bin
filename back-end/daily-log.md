Back-end Documentation

# May 28

- Created test data in the `app.js` file (`pgData` and `mongoData` respectively)
- Finished routes
- To do: function to generate a unique webhook token - https://www.npmjs.com/package/uuid#uuidv4options-buffer-offset
  - Considerations:
    - We need a way to generate a unique id for each webhook token
    - UUID v4 generates a random UUID of 32 characters w/ 256 possibilities for each (very unlikely to get a duplicate)
      - Still need a way to guarantee uniqueness: check database each time (slow), do a time based clean out (doesn't persist requests past X time interval)
- added some todos to Trello

# May 29

- Created local instance of Mongo DB
- Created local instance of PG
- Finished PG services see file `pgService.js`
- Finished Mongo services see file `mongoService.js`
- Finished routes in `app.js`
- Created a `.env` file to store postgres and mongo url
  - `POSTGRES_URI=postgresql://postgres:postgres@localhost:5432/request_bin`
  - `MONGODB_URI=mongodb://localhost:27017/request_bin`
- TODOs:
  - Issue with encrypting mongo id:
    - Mongo id can be encrypted, but not decrypted (with bcrypt, you can only compare...maybe a different library?)
  - Create file with test data for PG and Mongo
