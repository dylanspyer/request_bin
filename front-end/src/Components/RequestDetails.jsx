/* eslint-disable react/prop-types */
const createTable = (title, property) => {
  if (!property) return;

  return (
    <table>
      <thead>
        <tr>
          <th>{title}</th>
        </tr>
      </thead>
      <tbody>{createTableRows(property)}</tbody>
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
    <tr key={key}>
      <td>{key}</td>
      <td>{value} </td>
    </tr>
  );
};

const handleBodyDataType = (body) => {
  if (typeof body === "string") {
    return (
      <>
        <h2>Body</h2>
        <p>{body}</p>
      </>
    );
  } else {
    return createTable("Body", body);
  }
};

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

    const { method, path, headers, queryParams, body } = selectedRequestDetails;

    return (
      <div className="column">
        <h2>Selected Request Data</h2>
        <p>
          {" "}
          Details: {method} {path}{" "}
        </p>

        {createTable("Headers", headers)}
        {createTable("Query Params", queryParams)}
        {handleBodyDataType(body)}
      </div>
    );
  };

  return <>{requestData()}</>;
};

export default RequestDetails;
