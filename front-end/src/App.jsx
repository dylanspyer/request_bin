import { useEffect, useState } from "react";
import requestsService from "./services/requests";
import mongoRequestDataService from "./services/mongoRequestData";
import generateWebhookTokenService from "./services/generateWebhookToken";
import RequestList from "./Components/RequestList";
import RequestDetails from "./Components/RequestDetails";
import EndPoint from "./Components/EndPoint";
import TitleBar from "./Components/TitleBar";
const localStorageToken = localStorage.getItem("webhookToken");

import "./styles.css";

function App() {
  // Holds the "targeted" request on the RHS
  const [selectedRequestDetails, setSelectedRequestDetails] = useState(null);
  const [requests, setRequests] = useState([]);
  const [webhookToken, setWebhookToken] = useState(() => {
    return localStorageToken ? localStorageToken : null;
  });

  // Get the webhook from the url if it already exists
  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath.length > 1) {
      localStorage.setItem("webhookToken", currentPath.substring(1));
      setWebhookToken(currentPath.substring(1));
    }
  }, []);

  // Pull all the requests that have been sent to current webhook
  useEffect(() => {
    if (webhookToken !== null) {
      requestsService
        .getAllByToken(webhookToken)
        .then((requests) => {
          setRequests(requests);
        })
        .catch(() => {
          setWebhookToken(null);
          window.location.href = "/";
        });
    }
  }, [webhookToken]);

  // Changes "targeted" request when a user clicks a request button on the LHS
  const handleRequestClick = async (request_id) => {
    try {
      const mongoRequestData =
        await mongoRequestDataService.getById(request_id);

      if (
        selectedRequestDetails === null ||
        mongoRequestData.id != selectedRequestDetails.id
      ) {
        setSelectedRequestDetails(mongoRequestData);
      } else {
        setSelectedRequestDetails(null);
      }
    } catch (error) {
      console.error("an error occurred when handling click");
    }
  };

  // Send to the backend to create a webhook token
  const createWebhook = () => {
    generateWebhookTokenService.getWebhookToken().then((token) => {
      setWebhookToken(token);
      window.location.href = window.location.href + token;
    });
  };

  const WelcomeContent = () => (
    <div className="content">
      <button onClick={() => createWebhook()}>
        Click here to create a webhook
      </button>
    </div>
  );

  const RequestContent = () => (
    <div>
      <EndPoint webhookToken={webhookToken} setRequests={setRequests} />
      <div className="flex-container">
        <RequestList
          requests={requests}
          handleRequestClick={handleRequestClick}
        />
        <RequestDetails selectedRequestDetails={selectedRequestDetails} />
      </div>
    </div>
  );

  return (
    <>
      <TitleBar />
      {webhookToken === null ? <WelcomeContent /> : <RequestContent />}
    </>
  );
}

export default App;
