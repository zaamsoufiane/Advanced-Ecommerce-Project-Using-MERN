import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import {isAuthenticate} from "./helpers"

const AdminRoute = ({component: component, ...rest}) => {
    return (isAuthenticate() && isAuthenticate().user.role == 1) ? <Outlet /> : <Navigate to="/"/>
}

export default AdminRoute