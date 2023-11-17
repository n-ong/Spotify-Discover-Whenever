import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="homePage">
          Discover Whenever
        </Link>
        <Link to="/create" className="newPlaylist">
          New Playlist
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
