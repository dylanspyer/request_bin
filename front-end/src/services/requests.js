import axios from "axios";
const baseUrl = "/api/allRequests"

const deleteById = async (id) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/deleteOldRequest/${id}`
    );
    
    return response
    
  } catch (error) {
    console.error(error);
    throw Error;
  }
}

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
      let index = 0
      const currentDate = new Date()
      while (index < response.data.length) {
        if (currentDate - new Date(response.data[index].created_at) > 30000) {
          await deleteById(response.data[index].request_id)
          response.data.splice(index, 1)
          continue
        }

        index += 1
      }
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
