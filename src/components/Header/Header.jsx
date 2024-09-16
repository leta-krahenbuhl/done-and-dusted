import "./Header.scss";
import logo from "../../assets/images/logo.svg";

export default function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="landing-logo" />
      <div className="greeting-avatar">hi</div>
    </div>
  );
}
