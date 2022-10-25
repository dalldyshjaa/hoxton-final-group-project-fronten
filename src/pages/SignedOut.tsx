import { Routes, Route } from "react-router-dom";
import { LogIn } from "./Login";
import { Signup } from "./SignUp";

export function SignedOut({ setUserOn }: any) {
  return (
    <>
      <Routes>
        <Route index element={<LogIn setUserOn={setUserOn} />} />
        <Route path="/sign-up" element={<Signup setUserOn={setUserOn} />} />
      </Routes>
    </>
  );
}
