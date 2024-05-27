import { useState } from "react";

function App() {
  // Holds the "targeted" request on the RHS
  const [currentRequest, setCurrentRequest] = useState(null);
  const [requests, setRequests] = useState([
    {
      time: "12:00",
      method: "POST",
      path: "/post_request",
      request_id: "mongoID_1",
    },
    {
      time: "12:00",
      method: "GET",
      path: "/get_request",
      request_id: "mongoID_2",
    },
  ]);

  // Populates LHS list
  // Passes the MongoDB ID when clicked
  // To be converted to a component
  const createRequestList = () => {
    return requests.map((r) => (
      <button
        key={r.request_id}
        onClick={() => handleRequestClick(r.request_id)}
      >
        {" "}
        {r.time} {r.method} {r.path}
      </button>
    ));
  };

  // Changes "targeted" request when a user clicks a request button on the LHS
  const handleRequestClick = (request_id) => {
    setCurrentRequest(request_id);
  };

  // Populates default info before a user clicks a target request
  const defaultInfo = () => {
    return (
      <div>
        <h2>Welcome to our Site</h2>
      </div>
    );
  };
  return (
    <>
      <h2>Requests</h2>
      <div>{createRequestList()}</div>
      {currentRequest || defaultInfo()}
    </>
  );
}

export default App;
