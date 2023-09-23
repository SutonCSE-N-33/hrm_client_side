import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const Header = () => {
  const {logoutUser} = useContext(AuthContext)
  const handleLogout = ()=>{
    logoutUser()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
  }
  return (
    <div>
      <div className="navbar bg-sky-900 text-neutral-content flex justify-between">
        <Link style={{textDecoration:"none",color:"white"}} className="btn btn-ghost normal-case text-xl ml-3" to="/admin">
          HR MANAGEMENT
        </Link>
        <button style={{textDecoration:"none",color:"white"}}
          className="btn mr-3 bg-sky-900 hover:bg-sky-700 border-none"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
