const Button = ({ onClick, title, backgroundColor, fontColor }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: backgroundColor, color: fontColor }}
    >
      {title}
    </button>
  );
};

export default Button;
