import { useEffect, useState } from "react";
import requestsService from "./services/requests";
import mongoRequestDataService from "./services/mongoRequestData";
import RequestList from "./Components/RequestList";
import RequestDetails from "./Components/RequestDetails";

function App() {
  // Holds the "targeted" request on the RHS
  const [selectedRequestDetails, setSelectedRequestDetails] = useState(null);
  const [requests, setRequests] = useState([]);
  const [webhookToken, setWebhookToken] = useState(null);

  // Get the webhook from the url if it already exists
  useEffect(() => {
    const currentUrl = window.location.pathname;
    if (currentUrl.length > 1) {
      setWebhookToken(currentUrl.substring(1));
    }
  }, []);

  // Pull all the requests that have been sent to current webhook
  useEffect(() => {
    if (webhookToken !== null) {
      requestsService.getAll(webhookToken).then((requests) => {
        if (!!requests) {
          setRequests(requests);
        }
        // Need to figure out how to set webhook token to null when invalid request made
        setWebhookToken(null)
      }).catch(() => {
        setWebhookToken(null)
      });
    }
  }, [webhookToken]);

  // Changes "targeted" request when a user clicks a request button on the LHS
  const handleRequestClick = async (mongo_id) => {
    try {
      const mongoRequestData = await mongoRequestDataService.getById(mongo_id);
      
      if (selectedRequestDetails === null || mongoRequestData.id != selectedRequestDetails.id) {
        setSelectedRequestDetails(mongoRequestData);
      } else {
        setSelectedRequestDetails(null);
      }
    } catch (error) {
      console.error("an error occurred when handling click");
    }
  };

  // Send to the backend to create a webhook token
  // Using a generic one for now
  const createWebhook = () => {
    setWebhookToken('GenericWebhookToken');
  }

  if (webhookToken === null) {
    return (
      <div>
        <h1>Team_2 RequestBin Site</h1>
        <button onClick={() => createWebhook()}>
          Click here to create a webhook
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1>Team_2 RequestBin Site</h1><p style={{textAlign:'right'}}>{webhookToken}</p>
      <div className="row">
        <RequestList
          requests={requests}
          handleRequestClick={handleRequestClick}
        />
        <RequestDetails selectedRequestDetails={selectedRequestDetails} />
      </div>
    </div>
  );
}

export default App;
