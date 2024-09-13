import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../src/pages/Landing/Landing";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
