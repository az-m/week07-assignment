import { Routes, Route } from "react-router";
import Scrap from "./components/Scrap";
import Page1 from "./pages/Page1";

export const routes = (
  <Routes>
    <Route path="scrap" element={<Scrap />} />
    <Route path="page1" element={<Page1 />} />
  </Routes>
);
