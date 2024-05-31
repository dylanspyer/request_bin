// eslint-disable-next-line react/prop-types
const EndPoint = ({ webhookToken, refreshRequests }) => {
  const copyText = () => {
    const textToCopy = document.querySelector(".request-bin-link").textContent;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Text copied to clipboard: " + textToCopy);
      })
      .catch((err) => {
        // Error message
        console.error("Could not copy text: ", err);
      });
  };

  const clearLocalStorageNavigateHome = () => {
    localStorage.removeItem("webhookToken");
    window.location.href = "/";
  };

  return (
    <div className="endpoint-container">
      <div>
        <button onClick={clearLocalStorageNavigateHome}>
          Create a New Webhook Token
        </button>
      </div>
      <div className="endpoint-info">
        <button onClick={refreshRequests}>Refresh Requests</button>
        <button onClick={copyText}>Copy</button>
        <p className="request-bin-link">
          {window.location.href.replace(webhookToken, "") +
            "api/request/" +
            webhookToken}
        </p>
      </div>
    </div>
  );
};

export default EndPoint;
