import axios from "axios";

// Get default JSON objects from JSON server (on db.json)
const getAll = async () => {
  try {
    // Pulling from the JSON server
    // First enter into the terminal: npx json-server --port 3001 --watch db.json
    const response = await axios.get("http://localhost:3001/requests");

    return response.data;
  } catch (error) {
    console.log("an error occurred");
  }
};

export default { getAll };
