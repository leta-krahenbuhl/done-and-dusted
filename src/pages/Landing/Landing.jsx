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
          <p className="landing-main__text">
            Tired of arguing over who did the dishes last or whose turn it is to
            vacuum? With Done & Dusted, sharing chores becomes a friendly
            competition that everyone in the house can enjoy! Who will be the
            ultimate chore champion in your house? Step up, clean up, and show
            everyone who's boss!
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
