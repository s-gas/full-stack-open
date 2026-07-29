import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => {
  return (
    <div className="links-container">
      <Link to="/">blogs</Link>
      {user && <Link to="/create">new blog</Link>}
      {!user && <Link to="/login">login</Link>}
      {user && <button onClick={handleLogout}>logout</button>}
    </div>
  );
};

export default Navbar;
