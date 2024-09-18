import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../src/pages/Landing/Landing";
import Home from "../src/pages/Home/Home";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";
import MyAccount from "./pages/MyAccount/MyAccount";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <MyAccount />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
