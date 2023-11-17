import "./Button.css";

interface Props {
  name: string;
  buttonType: string;
  onClick: () => void;
}
const Button = ({ name, buttonType, onClick }: Props) => {
  return (
    <button className={buttonType} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
