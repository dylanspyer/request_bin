import { useEffect, useState } from "react";
import requestsService from "./services/requests";
import requestDataService from "./services/requestData";
import RequestList from "./Components/RequestList";
import RequestDetails from "./Components/RequestDetails";

function App() {
  // Holds the "targeted" request on the RHS
  const [selectedRequestDetails, setSelectedRequestDetails] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    requestsService.getAll().then((requests) => {
      setRequests(requests);
    });
  }, []);

  // Changes "targeted" request when a user clicks a request button on the LHS
  const handleRequestClick = async (request_id) => {
    try {
      const request_data = await requestDataService.getById(request_id);
      setSelectedRequestDetails(request_data);
    } catch (error) {
      console.error("an error occurred when handling click");
    }
  };

  return (
    <>
      <h2>Requests</h2>
      <RequestList
        requests={requests}
        handleRequestClick={handleRequestClick}
      />
      <RequestDetails selectedRequestDetails={selectedRequestDetails} />
    </>
  );
}

export default App;
