import axios from "axios";

// Get default JSON objects from JSON server (on db.json)
const getAll = async (webhookToken) => {
  try {
    // Pulling from the JSON server
    // First enter into the terminal: npx json-server --port 3001 --watch db.json
    
    const response = await axios.get(`http://localhost:3001/pgDB`);
    // /api/allRequests/${webhookToken}
    // console.log(response.data)

    console.log(response.data[webhookToken])
    if (!!response.data[webhookToken]) {
      return response.data[webhookToken];
    } else {
      throw "Webhook Token Not Found"
    }
  } catch (error) {
    console.error(error)
  }
};

export default { getAll };
