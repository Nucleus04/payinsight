import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Authentication from "../../ui/layout/Authentication";
import Home from "../../ui/layout/Home";
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Authentication />} />
                <Route exact path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;