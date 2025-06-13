import { useState, useEffect } from "react";
// import AddGameForm from "./AddGameForm";

const APIroot = import.meta.env.VITE_API_ROOT;

export default function Scrap() {
  const [formValues, setFormValues] = useState({
    title: "",
    platform: "",
    year: "",
    comments: "",
    status: null,
    completed: null,
  });

  const [genreValues, setGenreValues] = useState([]);

  const [statusArr, setStatusArr] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(APIroot + "/getStatusList");
      // id, status
      const data = await response.json();
      setStatusArr(data);
    }
    fetchData();
  }, []);

  const [genreArr, setGenreArr] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(APIroot + "/getGenreList");
      // id, name
      const data = await response.json();
      setGenreArr(data);
    }
    fetchData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    formValues.status = parseInt(formValues.status);

    fetch(APIroot + "/newGameRecord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
  }
  function handleChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function handleChangeGenres(e) {
    // thank you Tim for this function!
    const temp = [];
    for (const item of e.target) {
      if (item.selected) {
        temp.push(item.value);
      }
    }
    setGenreValues(temp);
  }

  return (
    <>
      <h2>scrap</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="platform">Platform/Store</label>
          <select
            id="platform"
            name="platform"
            value={formValues.platform}
            onChange={handleChange}
          >
            <option hidden>Select...</option>
            <option>Steam</option>
            <option>EPIC</option>
            <option>Amazon</option>
            <option>GOG Galaxy</option>
            <option>Windows</option>
            <option>EA Origin</option>
            <option>Ubisoft</option>
            <option>Blizzard</option>
            <option>DVD</option>
          </select>
          <label htmlFor="genres">Genres</label>
          {genreArr[0] ? (
            <select
              id="genres"
              name="genres"
              defaultValue={genreValues} //default value not value is super important don't forget
              onChange={handleChangeGenres}
              multiple
            >
              <option hidden>Select...</option>
              {genreArr.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          ) : null}
          <label htmlFor="year">Release year (yyyy)</label>
          <input
            type="text"
            maxLength={4}
            id="year"
            name="year"
            value={formValues.year}
            onChange={handleChange}
          />
          <label htmlFor="comments">Comments</label>
          <textarea
            type="textarea"
            id="comments"
            name="comments"
            value={formValues.comments}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="status">Status</label>
          {statusArr[0] ? (
            <select
              id="status"
              name="status"
              value={formValues.status}
              onChange={handleChange}
            >
              <option hidden>Select...</option>
              {statusArr.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.status}
                </option>
              ))}
            </select>
          ) : null}
          <label htmlFor="completed">Completed date</label>
          <input
            type="date"
            id="completed"
            name="completed"
            onChange={handleChange}
          />

          <button type="submit" id="submit">
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
}
