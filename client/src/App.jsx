import { Link } from "react-router";
import "./App.css";
import { routes } from "./routes.jsx";

function App() {
  return (
    <>
      <header>
        <h1>Backlog</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="page1">Page1</Link>
          <Link to="page2">Page2</Link>
          <Link to="page3">Page3</Link>
        </nav>
      </header>
      {routes}
    </>
  );
}

export default App;
