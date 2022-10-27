import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ReservationForm } from "../components/ReservationForm";
import { ProfilePage } from "./ProfilePage";
import { Home } from "./Home";
import { SingleRoom } from "./SingleRoom";
export function SignedIn({ userOn, setUserOn, SignOut }: any) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/get-all-rooms")
      .then((resp) => resp.json())
      .then((rooms) => setRooms(rooms));
  }, []);

  return (
    <Routes>
      <Route
        path="/single-page/:roomId"
        element={<SingleRoom userOn={userOn} SignOut={SignOut} />}
      />
      <Route
        path="/profile/:userId"
        element={<ProfilePage userOn={userOn} SignOut={SignOut} />}
      />
      <Route
        index
        element={<Home rooms={rooms} userOn={userOn} SignOut={SignOut} />}
      />
    </Routes>
  );
}
