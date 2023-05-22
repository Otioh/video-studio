import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Editor from "./Pages/Editor";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import Studio from "./Pages/Studio";
import { useState } from "react";

function App() {
  const [previd, setprevid] = useState();

  return (
    <div className="App wrapper">
      <Routes>
        <Route
          path={"/editor"}
          element={<Editor previd={previd} setprevid={setprevid} />}
        />

        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
