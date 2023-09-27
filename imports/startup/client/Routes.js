import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Authentication from "../../ui/layout/Authentication";
import Home from "../../ui/layout/Home";
import Feedback from "../../ui/pages/Feedback";
import store from "../../ui/redux/store";
import { Provider } from "react-redux";
import FeedbackList from "../../ui/pages/FeedbackList";
function Router() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Authentication />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/feedback" element={<Feedback />} />
                    <Route exact path="/feedback-list" element={<FeedbackList />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default Router;