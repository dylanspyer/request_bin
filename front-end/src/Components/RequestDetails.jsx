/* eslint-disable react/prop-types */

const RequestDetails = ({ selectedRequestDetails }) => {
  // Display "targeted" request data on RHS
  const requestData = () => {
    // Populates default info before a user clicks a target request
    if (selectedRequestDetails === null) {
      return (
        <div className="column">
          <h2>Welcome to our Site</h2>
          <p>*Default statement*</p>
        </div>
      );
    }

    const createTable = (title, property) => {
      if (!property) return;

      return (
        <table>
          <th>{title}</th>
          {createTableRows(property)}
        </table>
      );
    };

    const createTableRows = (headers) => {
      const entries = Object.entries(headers);
      return entries.map(createTableD);
    };

    const createTableD = (entry) => {
      const [key, value] = entry;
      return (
        <tr>
          <td>{key}</td>
          <td>{value} </td>
        </tr>
      );
    };
    console.log(selectedRequestDetails);
    return (
      <div className="column">
        <h2>Selected Request Data</h2>
        <p>
          {" "}
          Details: {selectedRequestDetails.method} {selectedRequestDetails.path}{" "}
        </p>

        {createTable("Headers", selectedRequestDetails.headers)}
        {createTable("Query Params", selectedRequestDetails.queryParams)}
        {createTable("Body", selectedRequestDetails.body)}
      </div>
    );
  };

  return <>{requestData()}</>;
};

export default RequestDetails;
