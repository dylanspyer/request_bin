/* eslint-disable react/prop-types */

const RequestDetails = ({ selectedRequestDetails }) => {
  // Display "targeted" request data on RHS
  const requestData = () => {
    console.log(selectedRequestDetails);
    // Populates default info before a user clicks a target request
    if (selectedRequestDetails === null) {
      return (
        <div className="column">
          <h2>Welcome to our Site</h2>
          <p>*Default statement*</p>
        </div>
      );
    }

    const createRequestList = (object) => {
      return requests.map(requestInfo);
    };

    const requestInfo = ({ request_id, time, method, path }) => {
      return (
        <li key={request_id}>
          <button onClick={() => handleRequestClick(request_id)}>
            {" "}
            {time} {method} {path}
          </button>
        </li>
      );
    };

    const displayObject = (headers) => {
      for (var key in headers) {
        console.log(key + " -> " + headers[key]);
        // if (key == "name") doSomething();
      }
    };

    return (
      <div className="column">
        <h2>Selected Request Data</h2>
        <p>
          {" "}
          Details: {selectedRequestDetails.method} {selectedRequestDetails.path}{" "}
        </p>
        {/* <p> Headers: {displayObject(selectedRequestDetails.headers)} </p> */}
        <h2>Headers</h2>
        <ul>{createRequestList}</ul>
      </div>
    );
  };

  return <>{requestData()}</>;
};

export default RequestDetails;
