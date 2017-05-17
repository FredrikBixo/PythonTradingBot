/*
 * Application entry point
 */

import React from "react";
import render from "react-dom";
import {Route} from "react-router-dom"

if(process.env.BUILD_TARGET == "browser"){
    require("./common/styles/base/base.scss");
}



export default class App extends React.Component{
    render(){
        return (
            <div className="routes">
                
            </div>
        );
    }
}
//
