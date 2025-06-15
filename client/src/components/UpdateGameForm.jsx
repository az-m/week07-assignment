import { useState } from "react";
import "./UpdateGameForm.css";

const APIroot = import.meta.env.VITE_API_ROOT;

export default function UpdateGameForm({ sel, set, setUpdate }) {
  const [formValues, setFormValues] = useState({
    comments: "",
    status: 3,
    completed: null,
  });

  function handleSubmit(e) {
    e.preventDefault();

    formValues.status = parseInt(formValues.status);

    fetch(`${APIroot}/updateGameRecord/${sel}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    set(0);
    setUpdate(true);
  }

  function handleChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="updateform">
        <fieldset>
          <legend>Update game details</legend>
          <label htmlFor="comments">Comments</label>
          <textarea
            type="textarea"
            id="comments"
            name="comments"
            value={formValues.comments}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            defaultValue="3"
            onChange={handleChange}
            required
          >
            {/* I know hard-coding them here is lazy, just imagine I pulled them from the db table like i did on the FullList - i was running out of time!  */}
            <option value="1">Completed</option>
            <option value="2">Unplayed</option>
            <option value="3">In Progress</option>
          </select>
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
