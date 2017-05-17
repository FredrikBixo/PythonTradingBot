import "babel-polyfill";
import {BrowserRouter, browserHistory} from "react-router-dom";
import React from "react";
import {render} from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunkMiddleWare from "redux-thunk";


import App from "./App";
import {reducer} from "./reducer";

//Grab state from server-generated html
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

//Create store from initial state

const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(thunkMiddleWare)
);

let unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

window.onload = () => {
    render(
        (
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        ), document.getElementById("app")
    );
}
