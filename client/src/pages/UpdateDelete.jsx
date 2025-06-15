import { NavLink } from "react-router";
import "./UpdateDelete.css";

export default function UpdateDelete() {
  return (
    <>
      <div className="links">
        <NavLink className="link" to="update">
          Update
        </NavLink>
        <NavLink className="link" to="delete">
          Delete
        </NavLink>
      </div>
    </>
  );
}
