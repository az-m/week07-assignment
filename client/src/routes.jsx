import { Routes, Route } from "react-router";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import HomePage from "./pages/HomePage";

export const routes = (
  <Routes>
    <Route index element={<HomePage />} />
    <Route path="page1" element={<Page1 />} />
    <Route path="page2" element={<Page2 />} />
    <Route path="page3" element={<Page3 />} />
  </Routes>
);
