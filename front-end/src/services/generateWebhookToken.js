import axios from "axios";

// Get default JSON objects from JSON server (on db.json)
const getWebhookToken = async () => {
  try {
    // Pulling from the JSON server
    // First enter into the terminal: npx json-server --port 3001 --watch db.json
    const response = await axios.post(
      `http://localhost:3000/api/generateWebhookToken`
    );

    console.log(response.data);

    return response.data.webHookToken;
  } catch (error) {
    console.log("an error occurred");
  }
};

export default { getWebhookToken };
