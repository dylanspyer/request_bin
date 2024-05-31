/* eslint-disable react/prop-types */
// import moment from "moment";
// import "moment-timezone";

// Populates LHS list
// Passes the MongoDB ID when clicked
const RequestList = ({ requests, handleRequestClick }) => {
  const createRequestList = (requests) => {
    return requests.map(requestInfo);
  };

  const requestInfo = ({ request_id, created_at, method, path }) => {
    const displayTime = () => {
      return new Date(created_at.replace(" ", "T")).toString().substring(0, 24);
    };
    return (
      <div
        key={request_id}
        onClick={() => handleRequestClick(request_id)}
        className="request-item"
      >
        <div className="time">{displayTime()}</div>
        <div className={method}> {method} </div> <div>{path}</div>
      </div>
    );
  };

  return (
    <div className="column left">
      <h2>List of Webhook Requests</h2>
      <div className="requests">{createRequestList(requests)}</div>
    </div>
  );
};

export default RequestList;
