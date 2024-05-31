/* eslint-disable react/prop-types */

// Populates LHS list
// Passes the MongoDB ID when clicked
const RequestList = ({ requests, handleRequestClick }) => {
  const createRequestList = (requests) => {
    return requests.map(requestInfo);
  };

  const requestInfo = ({ request_id, created_at, method, path }) => {
    const displayTime = () => {
      let time = created_at.toString().substring(11, 19);
      if (Number(time.substring(0, 2)) > 12) {
        return Number(time.substring(0, 2)) - 12 + time.substring(2) + " PM";
      } else {
        return time + " AM";
      }
    };
    return (
      <div
        key={request_id}
        onClick={() => handleRequestClick(request_id)}
        className="request-item"
      >
        {displayTime()} {method} {path}
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
