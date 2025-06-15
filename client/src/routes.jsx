import { Routes, Route } from "react-router";
import ListPage from "./pages/ListPage";
import AddPage from "./pages/AddPage";
import UpdatePage from "./pages/UpdatePage";
import HomePage from "./pages/HomePage";
import UpdateDelete from "./pages/UpdateDelete";
import DeletePage from "./pages/DeletePage";

export const routes = (
  <Routes>
    <Route index element={<HomePage />} />
    <Route path="listpage" element={<ListPage />} />
    <Route path="addpage" element={<AddPage />} />
    <Route path="manage">
      <Route index element={<UpdateDelete />} />
      <Route path="update" element={<UpdatePage />} />
      <Route path="delete" element={<DeletePage />} />
    </Route>
  </Routes>
);
