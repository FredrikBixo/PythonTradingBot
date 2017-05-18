import React from "react";
import {render} from "react-redux";
import {Link} from "react-router-dom";

if(process.env.BUILD_TARGET == "browser"){
    require("./styles.scss");
}


/**
 * Main page for delivery listings
 */
export default class Deliveries extends React.Component{

    render(){
        return (
            <div className="header">
                <ul>
                    <li><Link to="/stocks/">Stocks</Link></li>
                    <li><Link to="/ratings/">Ratings</Link></li>
                </ul>
            </div>
        );
    }
}
