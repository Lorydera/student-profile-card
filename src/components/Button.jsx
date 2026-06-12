const Button = ({ title, onClick, className = "" }) => (
  <button className={`btn ${className}`} onClick={onClick}>
    {title}
  </button>
);

export default Button;
