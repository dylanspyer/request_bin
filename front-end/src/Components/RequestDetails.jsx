/* eslint-disable react/prop-types */

const RequestDetails = ({ selectedRequestDetails }) => {
  // Display "targeted" request data on RHS
  const requestData = () => {
    
    // Populates default info before a user clicks a target request
    if (selectedRequestDetails == null) {
      return (
        <div className="column">
          <h2>Welcome to our Site</h2>
          <p>*Default statement*</p>
        </div>
      );
    }

    return (
      <div className="column">
        <h2>Selected Request Data</h2>
        <p> {selectedRequestDetails.header}</p>
        <p> {selectedRequestDetails.body}</p>
      </div>
    );
  };

  return (
    <>
      {requestData()}
    </>
  );
};

export default RequestDetails;
