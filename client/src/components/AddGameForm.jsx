import { useState } from "react";

export default function AddGameForm(
  statusArr,
  formValuesProp,
  handleSubmit,
  handleChange
) {
  const [formValues, setFormValues] = useState({});
  setFormValues(formValuesProp);
  console.log(statusArr);

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
          <label htmlFor="year">Release year (yyyy)</label>
          <input
            type="number"
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
              <option>{statusArr[0].status}</option>
              <option>{statusArr[1].status}</option>
              <option>{statusArr[2].status}</option>
            </select>
          ) : (
            <span>NOT HERE</span>
          )}
          <label htmlFor="completed">Completed date</label>
          <input
            type="date"
            id="completed"
            name="completed"
            value={formValues.completed}
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
