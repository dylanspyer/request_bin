/* eslint-disable react/prop-types */

// Populates LHS list
// Passes the MongoDB ID when clicked
const RequestList = ({ requests, handleRequestClick }) => {
  const createRequestList = (requests) => {
    return requests.map(requestInfo);
  };

  const requestInfo = ({ request_id, created_at, method, path }) => {
    const displayTime = () => {
      let time = created_at.toString().substring(11,19)
      if (Number(time.substring(0,2)) > 12) {
        return Number(time.substring(0,2)) - 12 + time.substring(2) + ' PM'
      } else {
        return time + ' AM'
      }
    }
    return (
      <li key={request_id}>
        <button onClick={() => handleRequestClick(request_id)}>
          {" "}
          {displayTime()} {method} {path}
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
