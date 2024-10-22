import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: "landing", children: [_jsx("header", { className: "landing-header", children: _jsx("img", { src: logo, alt: "logo", className: "landing-logo" }) }), _jsxs("main", { className: "landing-main", children: [_jsxs("div", { className: "landing-main__image-container", children: [_jsx("img", { src: cleaningIllustration1, alt: "cleaning illustration", className: "landing-main__illustration" }), _jsxs("p", { className: "landing-main__footnote", children: ["Image source:", _jsx("a", { target: "blank", className: "landing-main__link", href: "https://www.vecteezy.com/?utm_source=google&utm_medium=cpc&utm_campaign=brand&utm_term=vecteezy&utm_content=us&gad_source=1&gclid=CjwKCAjwvKi4BhABEiwAH2gcw0eXZXWrieq-DsBPfqhaQx0AMMYd9ejuOczApurk3-LYjrM0pFS5VRoCCL0QAvD_BwE", children: "vecteezy" })] })] }), _jsxs("div", { className: "landing-main__text-and-buttons", children: [_jsx("h1", { className: "landing-main__h1", children: "Where Housework Meets Game Time" }), _jsx("p", { className: "landing-main__text", children: "Transform mundane chores into a thrilling competition for the whole house. Get ready to hit the 'done' button and get that dopamine!" }), _jsx("p", { className: "landing-main__text", children: "Done&Dusted is an interactive way to tackle your to-do list and see how you stack up against your friends or family with the weekly scoreboard. Who's gonna be the weekly champion?" }), _jsxs("div", { className: "landing-main__buttons", children: [_jsx("button", { className: "landing-main__button", onClick: handleClickLogIn, children: "LOG IN" }), _jsx("button", { className: "landing-main__button", onClick: handleClickSignup, children: "SIGN UP" })] })] })] }), _jsx(SignUp, { isSignUpOpen: isSignUpOpen, handleCloseSignUp: handleCloseSignUp }), _jsx(LogIn, { isLogInOpen: isLogInOpen, handleCloseLogIn: handleCloseLogIn })] }));
}
