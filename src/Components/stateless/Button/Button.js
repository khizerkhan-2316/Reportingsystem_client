import '../../../root.css';
import './Button.css';

const Button = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className="login-button"
      style={props.style}
    >
      {' '}
      {props.children}
    </button>
  );
};

export default Button;
