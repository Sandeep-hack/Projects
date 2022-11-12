import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="App__body">
          <BrowserRouter>
            <Sidebar />
            <Chat />
            <Routes>
              <Route path="/rooms/:roomId" />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;