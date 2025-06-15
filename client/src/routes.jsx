import { Routes, Route } from "react-router";
import ListPage from "./pages/ListPage";
import AddPage from "./pages/AddPage";
import UpdatePage from "./pages/UpdatePage";
import HomePage from "./pages/HomePage";

export const routes = (
  <Routes>
    <Route index element={<HomePage />} />
    <Route path="listpage" element={<ListPage />} />
    <Route path="addpage" element={<AddPage />} />
    <Route path="updatepage" element={<UpdatePage />} />
  </Routes>
);
