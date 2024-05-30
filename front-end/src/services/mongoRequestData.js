import axios from "axios";
const baseUrl = "/api/getSpecificRequest"

// Get default JSON objects from JSON server (on db.json)
const getById = async (request_id) => {
  try {
    // Pulling from the JSON server
    // First enter into the terminal: npx json-server --port 3001 --watch db.json
    const response = await axios.get(
      `${baseUrl}/${request_id}`
    );

    return response.data;
  } catch (error) {
    console.log("an error occurred");
  }
};

export default { getById };
