import React from "react";
import {render} from "react-redux";

if(process.env.BUILD_TARGET == "browser"){
    require("./styles/deliveries.scss");
}


/**
 * Main page for delivery listings
 */
export default class Deliveries extends React.Component{
    /**
     * Fetches the ratings data
     */
    componentDidMount(){
        if(this.props.shouldFetchDeliveries && !this.props.isFetching){
            this.props.fetchDeliveries({});
        }
    }

    render(){
        return (
            <div className="main deliveriesMain">

            </div>
        );
    }
}
