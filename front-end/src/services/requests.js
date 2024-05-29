import axios from "axios";

const getAllByToken = async (webhookToken) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/allRequests/${webhookToken}`
    );
    // /api/allRequests/${webhookToken}
    // console.log(response.data)
    console.log("response", response);
    console.log(response.data);
    if (response.data) {
      return response.data;
    } else {
      throw "Webhook Token Not Found";
    }
  } catch (error) {
    console.error(error);
    throw Error;
  }
};

export default { getAllByToken };
