import "./Landing.scss";
import logo from "../../assets/images/logo.svg";
import cleaningIllustration1 from "../../assets/images/cleaning1.svg";
import { useState } from "react";
import SignUp from "../../components/SignUp/SignUp";
import LogIn from "../../components/LogIn/LogIn";

export default function Landing() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLogInOpen, setIsLogInOpen] = useState(false);

  const handleClickSignup = () => {
    setIsSignUpOpen(true);
  };

  const handleCloseSignUp = () => {
    setIsSignUpOpen(false);
  };

  const handleClickLogIn = () => {
    setIsLogInOpen(true);
  };

  const handleCloseLogIn = () => {
    setIsLogInOpen(false);
  };

  return (
    <div className="landing">
      <header className="landing-header">
        <img src={logo} alt="logo" className="landing-logo" />
      </header>
      <main className="landing-main">
        <img
          src={cleaningIllustration1}
          alt="cleaning illustration"
          className="landing-main__illustration"
        />
        <div className="landing-main__text-and-buttons">
          <h1 className="landing-main__h1">Where Housework Meets Game Time</h1>
          <p className="landing-main__text">
            Transform mundane chores into a thrilling competition for the whole
            house. Get ready to hit the 'done' button and get that dopamine!
          </p>
          <p className="landing-main__text">
            Done&Dusted is an interactive way to tackle your to-do list and see
            how you stack up against your friends or family with the weekly
            scoreboard. Who's gonna be the weekly champion?
          </p>
          <div className="landing-main__buttons">
            <button className="landing-main__button" onClick={handleClickLogIn}>
              LOG IN
            </button>
            <button
              className="landing-main__button"
              onClick={handleClickSignup}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </main>
      <SignUp
        isSignUpOpen={isSignUpOpen}
        handleCloseSignUp={handleCloseSignUp}
      />
      <LogIn isLogInOpen={isLogInOpen} handleCloseLogIn={handleCloseLogIn} />
    </div>
  );
}
