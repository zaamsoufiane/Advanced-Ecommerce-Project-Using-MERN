import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import {isAuthenticate} from "./helpers"

const PrivateRoute = ({component: component, ...rest}) => {
    return isAuthenticate() ? <Outlet /> : <Navigate to="/signin"/>
}

export default PrivateRoute