import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => {
  return (
    <div className="flex justify-between items-baseline gap-2 px-6 py-4 border-b border-gray-300 mb-8">
      <p className="text-xl">Blog App</p>
      <div className="flex gap-2">
        <Link to="/" className="uppercase hover:underline underline-offset-4">Blogs</Link>
        {user && <Link className="uppercase hover:underline underline-offset-4" to="/create">New blog</Link>}
        {!user && <Link className="uppercase hover:underline underline-offset-4" to="/login">Login</Link>}
        {user && <button className="uppercase hover:underline underline-offset-4 cursor-pointer" onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
};

export default Navbar;
