import FullList from "../components/FullList";
import { useState } from "react";
export default function Page1() {
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
      <button onClick={handleOrder}>{sortOrder}</button>
      <FullList sortOrder={sortOrder} />
    </>
  );
}
