import FullList from "../components/FullList";
import { useState } from "react";
import "./ListPage.css";

export default function ListPage() {
  const [sortOrder, setSortOrder] = useState("ASC");

  function handleOrder() {
    if (sortOrder === "ASC") {
      setSortOrder("DESC");
    } else {
      setSortOrder("ASC");
    }
  }

  return (
    <>
      <div className="buttons">
        <button onClick={handleOrder}>{sortOrder}</button>
      </div>
      <FullList sortOrder={sortOrder} />
    </>
  );
}
