import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "1em", background: "#eee" }}>
      <Link to="/">Home</Link> |{" "}
      {user ? (
        <>
          <Link to="/add">Add</Link> | <Link to="/profile">Profile</Link> |{" "}
          <button 
    onClick={() => {
    logout();
    window.location.href = "/login"; 
  }}
>
  Logout
</button>

        </>
      ) : (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;