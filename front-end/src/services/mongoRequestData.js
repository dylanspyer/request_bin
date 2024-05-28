import axios from "axios";

// Get default JSON objects from JSON server (on db.json)
const getById = async (id) => {
  try {
    // Pulling from the JSON server
    // First enter into the terminal: npx json-server --port 3001 --watch db.json
    const responses = await axios.get(`http://localhost:3001/mongoRequestData`);

    const targetedResponse = responses.data[id];
    // const targetedResponse = responses.data.filter(
    //   (response) => response.id == id
    // )[0];

    return targetedResponse;
  } catch (error) {
    console.log("an error occurred");
  }
};

export default { getById };
