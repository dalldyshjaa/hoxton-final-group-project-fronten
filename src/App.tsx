import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SignedIn } from "./pages/SignedIn";
import { SignedOut } from "./pages/SignedOut";

function App() {
  const [token, setToken] = useState(localStorage.token);
  const [userOn, setUserOn] = useState(null);

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
        <SignedIn userOn={userOn} setUserOn={setUserOn} />
      ) : (
        <SignedOut setUserOn={setUserOn} />
      )}
    </div>
  );
}

export default App;
