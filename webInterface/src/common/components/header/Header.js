import React from "react";
import {render} from "react-redux";
import {Link, Route} from "react-router-dom";

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
                    <Route path="/stocks" children={({match}) => {
                        return (
                            <li><Link to="/stocks" className={match ? "active" : ""}>
                                Stocks
                            </Link></li>
                        );
                    }}/>
                    <Route path="/ratings" children={({match}) => {
                        return (
                            <li><Link to="/ratings" className={match ? "active" : ""}>
                                Ratings
                            </Link></li>
                        );
                    }}/>
                </ul>
            </div>
        );
    }
}
