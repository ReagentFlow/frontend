import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const RedirectRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? <Navigate to="/" /> : children;
};

export default RedirectRoute;