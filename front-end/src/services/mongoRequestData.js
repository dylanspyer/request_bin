import axios from "axios";

// Get default JSON objects from JSON server (on db.json)
const getById = async (request_id) => {
  try {
    // Pulling from the JSON server
    // First enter into the terminal: npx json-server --port 3001 --watch db.json
    const response = await axios.get(
      `http://localhost:3000/api/getSpecificRequest/${request_id}`
    );

    return response.data;
  } catch (error) {
    console.log("an error occurred");
  }
};

export default { getById };
