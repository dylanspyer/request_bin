import axios from "axios";
const baseUrl = "/api/allRequests"

const getAllByToken = async (webhookToken) => {
  try {
    const response = await axios.get(
      `${baseUrl}/${webhookToken}`
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
