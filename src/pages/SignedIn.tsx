import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ProfilePage } from "./ProfilePage";

export function SignedIn({ userOn, setUserOn }: any) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/get-all-rooms")
      .then((resp) => resp.json())
      .then((rooms) => setRooms(rooms));
  }, []);

  return (
    <Routes>
      <Route index element={<ProfilePage userOn={userOn} />} />
    </Routes>
  );
}
