import { NavLink } from "react-router";
import "./App.css";
import { routes } from "./routes.jsx";

function App() {
  return (
    <>
      <main>
        <header>
          <h1>Backlog</h1>
          <nav>
            <NavLink className="link" to="/">
              Home
            </NavLink>
            <NavLink className="link" to="listpage">
              Game List
            </NavLink>
            <NavLink className="link" to="addpage">
              Add
            </NavLink>
            <NavLink className="link" to="manage">
              Manage
            </NavLink>
          </nav>
        </header>
        {routes}
      </main>
    </>
  );
}

export default App;
