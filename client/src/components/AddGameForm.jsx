import { useState, useEffect } from "react";
import "./AddGameForm.css";

const APIroot = import.meta.env.VITE_API_ROOT;

export default function AddGameForm() {
  const [formValues, setFormValues] = useState({
    title: "",
    platform: "Steam",
    year: "",
    comments: "",
    status: 2,
    completed: null,
  });
  const [genreValues, setGenreValues] = useState([]);

  // these API calls are to get the values to populate the dropdown lists that refer to other tables

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

  async function handleSubmit(e) {
    e.preventDefault();

    formValues.status = parseInt(formValues.status);

    const response = await fetch(APIroot + "/newGameRecord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    // we need to update the junction table too ...

    if (response.status === 200) {
      const getLast = await fetch(APIroot + "/getMostRecentGameId");
      const lastID = await getLast.json();

      let gameGenreData = new Object();
      for (let value of genreValues) {
        gameGenreData.gameid = parseInt(lastID[0].id);
        gameGenreData.genreid = parseInt(value);

        fetch(APIroot + "/newGamesGenresRecord", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gameGenreData),
        });
      }

      setFormValues({
        title: "",
        platform: "Steam",
        year: "",
        comments: "",
        status: 2,
        completed: null,
      });

      setGenreValues([]);
    }
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
      <form onSubmit={handleSubmit} className="addform">
        <fieldset>
          <legend>Add game details</legend>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            placeholder="required"
            required
          />
          <label htmlFor="platform">Platform/Store</label>
          <select id="platform" name="platform" onChange={handleChange}>
            {/* these values aren't held in a separate table anywhere so I'll just hard-code them */}
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
              defaultValue={genreValues} //defaultValue not value is super important don't forget, thanks Manny for spotting
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
              defaultValue="2"
              onChange={handleChange}
              required
            >
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
