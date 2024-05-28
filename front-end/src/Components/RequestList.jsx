/* eslint-disable react/prop-types */

// Populates LHS list
// Passes the MongoDB ID when clicked
const RequestList = ({ requests, handleRequestClick }) => {
  const createRequestList = (requests) => {
    return requests.map(requestInfo);
  };

  const requestInfo = ({ mongo_id, time, method, path }) => {
    return (
      <li key={mongo_id}>
        <button onClick={() => handleRequestClick(mongo_id)}>
          {" "}
          {time} {method} {path}
        </button>
      </li>
    );
  };

  return (
    <div className="column">
      <h2>List of Webhook Requests</h2>
      <ul>{createRequestList(requests)}</ul>
    </div>
  );
};

export default RequestList;
