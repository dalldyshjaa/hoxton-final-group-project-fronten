import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";

export function SignedIn({ userOn, setUserOn }: any) {
  return <>
    <Routes>
      <Route index element={<Home /> } />
   </Routes>
  </>;
}
