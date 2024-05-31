/* eslint-disable react/prop-types */
import { useState } from "react";

const createTable = (title, property) => {
  if (!property) return;

  return (
    <div className="table-div">
      <h2>{title}</h2>{" "}
      <table>
        <tbody>{createTableRows(property)}</tbody>
      </table>
    </div>
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
        <div className="raw-text">
          <p>{body}</p>
        </div>
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
        <div className="column right">
          <h2>Welcome to our Site</h2>
        </div>
      );
    }

    const { method, path, headers, queryParams, body } = selectedRequestDetails;

    return (
      <div className="column right">
        <h2>Selected Request Data</h2>
        <p>
          {" "}
          Details: <span className={method}>{method}</span> {path}{" "}
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
