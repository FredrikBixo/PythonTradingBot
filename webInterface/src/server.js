import "babel-polyfill";
import path from "path";
import {Server} from "http";
import Express from "express";
import bodyParser from "body-parser";
import React from "react";
import {renderToString} from "react-dom/server";
import {StaticRouter} from "react-router";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunkMiddleWare from "redux-thunk";



//Configure express server
const app = new Express();
const server = new Server(app);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(({extended:true})));

//Set up static folder
app.use(Express.static(path.join(__dirname, "static")));

//Handle API requests
import handleDataRequest from "./data/handleDataRequest.js";
app.post("/data/*", handleDataRequest);

//Routing and rendering
import App from "./App";
import {reducer} from "./reducer";

app.get("*", (req, res, next) => {
    //Create redux store
    const store = createStore(reducer, applyMiddleware(thunkMiddleWare));

    //Render HTML
    const context = {};
    const reactMarkup = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App/>
            </StaticRouter>
        </Provider>
    );


    const preloadedState = store.getState();

    res.render("index", {reactMarkup: reactMarkup, preloadedState: JSON.stringify(preloadedState).replace(/</g, '\\u003c')});
    next();
});

//Start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "production";
server.listen(port, err => {
    if(err){
        return console.error(err);
    }
    console.info("Server running on http://localhost:" + port);
});
