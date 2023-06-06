import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
// import Books from "./pages/Books";
import Home from "./pages/Home";
import Update from "./pages/Update";
import "antd/dist/reset.css";
import "./style.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Books />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
