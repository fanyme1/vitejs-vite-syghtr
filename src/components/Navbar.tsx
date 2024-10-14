import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Fit.Solo</Link>
      <div className="navbar-links">
        <Link to="/">Fit.Solo Home</Link>
        <Link to="/exercises">Find Exercises</Link>
      </div>
    </nav>
  );
};

export default Navbar;