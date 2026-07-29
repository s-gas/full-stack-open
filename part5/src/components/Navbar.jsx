import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => {
  return (
    <div className="flex gap-2 px-6 py-2 border-b border-gray-300">
      <Link to="/" className="hover:underline underline-offset-4">blogs</Link>
      {user && <Link className="hover:underline underline-offset-4" to="/create">new blog</Link>}
      {!user && <Link className="hover:underline underline-offset-4" to="/login">login</Link>}
      {user && <button className="hover:underline underline-offset-4 cursor-pointer" onClick={handleLogout}>logout</button>}
    </div>
  );
};

export default Navbar;
