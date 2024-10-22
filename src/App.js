import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import MyAccount from "./pages/MyAccount/MyAccount";
const App = () => {
    return (_jsx(BrowserRouter, { children: _jsx("div", { className: "app", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Landing, {}) }), _jsx(Route, { path: "/home", element: _jsx(PrivateRoute, { children: _jsx(Home, {}) }) }), _jsx(Route, { path: "/account", element: _jsx(PrivateRoute, { children: _jsx(MyAccount, {}) }) })] }) }) }));
};
export default App;
