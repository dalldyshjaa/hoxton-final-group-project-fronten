import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ReservationForm } from "../components/ReservationForm";
import { ProfilePage } from "./ProfilePage";
import { Home } from "./Home";
export function SignedIn({ userOn, setUserOn }: any) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/get-all-rooms")
      .then((resp) => resp.json())
      .then((rooms) => setRooms(rooms));
  }, []);

  return (
    <Routes>
      <Route path="/reserve" element={<ReservationForm room={rooms[0]} />} />
      <Route path="/profile" element={<ProfilePage userOn={userOn} />} />
      <Route index element={<Home rooms={rooms} />} />
    </Routes>
  );
}
