/* eslint-disable react/prop-types */

// Populates LHS list
// Passes the MongoDB ID when clicked
// To be converted to a component
const RequestList = ({ requests, handleRequestClick }) => {
  const createRequestList = (requests) => {
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

  return (
    <>
      {" "}
      <ul>{createRequestList(requests)}</ul>
    </>
  );
};

export default RequestList;
