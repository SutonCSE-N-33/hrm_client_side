import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user, loading}= useContext(AuthContext)
    const location = useLocation()

    if(loading){
        return <div className=' flex justify-center items-center'>
            <button className="btn btn-square loading"></button>
        </div>
    }

    if(!user){
        return <Navigate to="/"/>;
    }
    return children;
};

export default PrivateRoute;