import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const HomeHeader = () => {
  
  return (
    <div>
      <div className="navbar bg-sky-900 text-neutral-content flex justify-between">
        <Link style={{textDecoration:"none",color:"white"}} className="btn btn-ghost normal-case text-xl ml-3" to="/">
          HR MANAGEMENT
        </Link>
        <Link to="/login" style={{textDecoration:"none",color:"white"}}
          className="btn mr-3 bg-sky-900 hover:bg-sky-700 border-none"
        >
          LogIn Admin
        </Link>
      </div>
    </div>
  );
};

export default HomeHeader;
