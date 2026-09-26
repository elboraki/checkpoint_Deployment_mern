import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        🍲 Recipe Book
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add" className="btn-link">
          + Add Recipe
        </Link>
      </nav>
    </header>
  );
}
