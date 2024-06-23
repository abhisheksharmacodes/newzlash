import React from "react";
import { Outlet, Link } from "react-router-dom";
import Home from "./Home";

export default function Layout() {
    return (
        <>
            <Outlet />
        </>
    )
}