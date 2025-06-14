import { useState } from "react";
import UpdateGameForm from "./UpdateGameForm";

const APIroot = import.meta.env.VITE_API_ROOT;

export default function SearchForm() {
  const [searchValues, setSearchValues] = useState({ title: "" });
  const [searchResults, setSearchResults] = useState([]);
  const [updated, setUpdated] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();

    const response = await fetch(
      `${APIroot}/getGamesLike?search=${searchValues.title}`
    );
    // id, title, comments, status, completed
    const data = await response.json();
    setSearchResults(data);
    setUpdated(false);
    setSearchValues({ title: "" });
  }

  function handleChange(e) {
    setSearchValues({ ...searchValues, [e.target.name]: e.target.value });
  }

  return (
    <>
      <form id="search" onSubmit={handleSearch}>
        <fieldset>
          <legend>Search for game</legend>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={searchValues.title}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </fieldset>
      </form>
      {searchResults[0] ? (
        <SearchResults
          results={searchResults}
          updated={updated}
          setUpdated={setUpdated}
        />
      ) : null}
    </>
  );
}

function SearchResults({ results, updated, setUpdated }) {
  const [selectedId, setSelectedId] = useState(0);

  function handleChange(e) {
    setSelectedId(e.target.value);
  }

  return (
    <>
      {selectedId > 0 ? (
        <UpdateGameForm
          sel={selectedId}
          set={setSelectedId}
          setUpdate={setUpdated}
        />
      ) : null}
      {results && !updated ? (
        <form id="results">
          {results.map((item) => (
            <fieldset key={item.id}>
              <input
                type="radio"
                name="game"
                value={item.id}
                onChange={handleChange}
              />
              <label htmlFor={item.title}>{item.title}</label>
            </fieldset>
          ))}
        </form>
      ) : null}
    </>
  );
}
