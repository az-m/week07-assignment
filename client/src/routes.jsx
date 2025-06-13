import { Routes, Route } from "react-router";
import Scrap from "./components/Scrap";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";

export const routes = (
  <Routes>
    <Route path="scrap" element={<Scrap />} />
    <Route path="page1" element={<Page1 />} />
    <Route path="page2" element={<Page2 />} />
  </Routes>
);
