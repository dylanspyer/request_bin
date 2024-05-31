import "../styles.css";
import logo from "../images/logo.png"; // Import the image file

const TitleBar = () => {
  return (
    <div className="titleBar">
      <h1>Captain Web Hook</h1>
      <img src={logo} className="logo" />
    </div>
  );
};

export default TitleBar;
