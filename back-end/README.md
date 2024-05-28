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
