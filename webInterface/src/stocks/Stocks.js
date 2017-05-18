import React from "react";
import {render} from "react-redux";

if(process.env.BUILD_TARGET == "browser"){
    require("./styles.scss");
}


import StockList from "./stockList/StockList";
import Stock from "./stock/Stock";

/**
 * Main page for browsing stocks
 */
export default class Stocks extends React.Component{

    render(){
        return (
            <div className="main stocksMain">
                <StockList />
                <Stock stockId={this.props.match.params.stockId} />
            </div>
        );
    }
}
