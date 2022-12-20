import React, { useEffect, useState } from "react";
import "./App.css";
import "./styles/style.css";
import NavBar from "./components/NavBar/NavBar";
import Container from "./components/Container/Container";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import AmityClientSession from "./service";
import { Route, Routes } from "react-router-dom";

function App() {
  let [login, setLogin] = useState(false);
  let uid = localStorage.getItem("uid");
  let name = localStorage.getItem("name");

  useEffect(() => {
    if (uid != null && name != null) {
      loginHandler(uid, name);
    } else {
      setLogin(false);
    }
  }, []);

  const loginHandler = (uid, name) => {
    AmityClientSession.registerSession({
      userId: uid,
      displayName: name,
    });
    AmityClientSession.on(
      "connectionStatusChanged",
      ({ oldValue, newValue }) => {
        if (newValue === "connected") {
          setLogin(true);
        }
      }
    );
  };

  const logoutHandler = () => {
    AmityClientSession.unregisterSession();
    setLogin(false);
  };

  return (
    <div>
      {!login && <Login onLogin={loginHandler} />}
      {login && (
        <div>
          <NavBar onLogout={logoutHandler} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/:streamId"
              element={<Container client={AmityClientSession} />}
            />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
