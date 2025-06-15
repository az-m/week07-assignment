import FullList from "../components/FullList";
import { useState } from "react";
import "./ListPage.css";

export default function ListPage() {
  const [sortOrder, setSortOrder] = useState("ASC");
  const [sortField, setSortField] = useState("games.title");

  function handleOrder() {
    if (sortOrder === "ASC") {
      setSortOrder("DESC");
    } else {
      setSortOrder("ASC");
    }
  }

  function handleField(e) {
    setSortField(e.target.value);
  }

  return (
    <>
      <div className="buttons">
        <button onClick={handleField} value={"games.title"}>
          Title
        </button>
        <button onClick={handleField} value={"status.status"}>
          Status
        </button>
        <button onClick={handleOrder}>{sortOrder}</button>
      </div>
      <FullList sortOrder={sortOrder} sortField={sortField} />
    </>
  );
}
