import "./DeleteGame.css";

const APIroot = import.meta.env.VITE_API_ROOT;

export default function DeleteGame({ sel, set, setUpdate }) {
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${APIroot}/deleteGameRecord/${sel}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    set(0);
    setUpdate(true);
  }

  return (
    <>
      <form className="delete" onSubmit={handleSubmit}>
        <button type="submit">Delete!</button>
      </form>
    </>
  );
}
