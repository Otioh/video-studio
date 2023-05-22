import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Editor from "./Pages/Editor";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

function App() {
  const [previd, setprevid] = useState();

  return (
    <div className="App wrapper">
      <Routes>
        <Route
          path="/"
          element={<Editor previd={previd} setprevid={setprevid} />}
        />
        <Route
          path={"/editor"}
          element={<Editor previd={previd} setprevid={setprevid} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
