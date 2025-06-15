import { useState, useEffect } from "react";
import "./FullList.css";
import Ticker from "./Ticker";

const APIroot = import.meta.env.VITE_API_ROOT;

export default function FullList({ sortField, sortOrder }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${APIroot}/getGames?sortField=${sortField}&sortOrder=${sortOrder}`
      );
      // id, title, platform, year (int), comments, status, completed (date), genres (arr)
      const data = await response.json();
      setItems(data);
    }
    fetchData();

    // the app itself does not really require polling of the database, but I've included it here simply because it was an
    // assignment requirement. Otherwise I would take this out.
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [sortField, sortOrder]);

  return (
    <>
      {items[0] ? (
        <div className="listWrap">
          <p className="fullListTitles">
            <span>Title</span>
            <span>Platform</span>
            <span>Year</span>
            <span>Comments</span>
            <span>Status</span>
            <span>Completed</span>
            <span>Genres</span>
          </p>
          {items.map((item) => (
            <p key={item.id} className="listItem">
              <span>{item.title}</span>
              <span>{item.platform}</span>
              <span>{item.year}</span>
              <span>{item.comments}</span>
              <span>{item.status}</span>
              <span>{parseDate(item.completed)}</span>
              <span>{concatArr(item.genres)}</span>
            </p>
          ))}
        </div>
      ) : (
        <Ticker />
      )}
    </>
  );
}

// a little bit of data format tidying for readability

function parseDate(d) {
  let date = new Date(d);
  if (d) {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    date = `${yyyy}-${mm}-${dd}`;
  } else {
    date = "";
  }
  return date;
}

function concatArr(a) {
  let arrStr = a.join(", ");
  return arrStr;
}
