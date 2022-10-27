import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SignedIn } from "./pages/SignedIn";
import { SignedOut } from "./pages/SignedOut";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [token, setToken] = useState(localStorage.token);
  const [userOn, setUserOn] = useState(null);

  const navigate = useNavigate();

  function SignOut() {
    localStorage.token = "";
    setUserOn(null);
    navigate("/");
  }

  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/validation", {
        method: "GET",
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUserOn(data.user);
          setToken(data.token);
          localStorage.token = data.token;
        });
    }
  }, []);

  return (
    <div className="App">
      {userOn ? (
        <SignedIn userOn={userOn} setUserOn={setUserOn} SignOut={SignOut} />
      ) : (
        <SignedOut setUserOn={setUserOn} />
      )}

      <Routes>
        <Route path="/home" element={<SignedIn />} />
      </Routes>
    </div>
  );
}

export default App;
