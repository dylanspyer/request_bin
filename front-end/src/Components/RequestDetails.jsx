/* eslint-disable react/prop-types */

const RequestDetails = ({ selectedRequestDetails }) => {
  // Populates default info before a user clicks a target request
  const defaultInfo = () => {
    return (
      <div>
        <h2>Welcome to our Site</h2>
      </div>
    );
  };

  // Display "targeted" request data on RHS
  const requestData = () => {
    if (selectedRequestDetails == null) {
      return null;
    }

    return (
      <>
        {" "}
        <p> {selectedRequestDetails.header}</p>
        <p> {selectedRequestDetails.body}</p>
      </>
    );
  };

  return <>{requestData() || defaultInfo()}</>;
};

export default RequestDetails;
