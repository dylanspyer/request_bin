import { useEffect, useState } from "react";
import requestsService from "./services/requests";
import mongoRequestDataService from "./services/mongoRequestData";
import generateWebhookTokenService from "./services/generateWebhookToken";
import RequestList from "./Components/RequestList";
import RequestDetails from "./Components/RequestDetails";
import Button from "./Components/Button";

const localStorageToken = localStorage.getItem("webhookToken");

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

  const clearLocalStorageNavigateHome = () => {
    localStorage.removeItem("webhookToken");
    window.location.href = "/";
  };

  // Send to the backend to create a webhook token
  // Using a generic one for now
  const createWebhook = () => {
    generateWebhookTokenService.getWebhookToken().then((token) => {
      setWebhookToken(token);
      window.location.href = window.location.href + token;
    });
  };

  if (webhookToken === null) {
    return (
      <div>
        <h1>Team_2 RequestBin Site</h1>
        <button onClick={() => createWebhook()}>
          Click here to create a webhook
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Team_2 RequestBin Site</h1>
        <Button
          onClick={clearLocalStorageNavigateHome}
          title="Create a New Webhook Token"
          backgroundColor="#841584"
          fontColor="white"
        />
        <p style={{ textAlign: "right" }}>
          {window.location.href.replace(webhookToken, "") +
            "api/request/" +
            webhookToken}
        </p>{" "}
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
}

export default App;
