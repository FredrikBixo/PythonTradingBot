import React from "react";
import {render} from "react-redux";
import fetch from "isomorphic-fetch";
import {Link, Route} from "react-router-dom";

if(process.env.BUILD_TARGET == "browser"){
    require("./styles.scss");
}


/**
 * Left sidepanel
 */
export default class StockList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isFetching: true,
            stocks: null
        }

        this.fetchStocks = this.fetchStocks.bind(this);
    }

    /**
     * Fetches the stock list
     */
    componentDidMount(){
        this.fetchStocks();
    }

    render(){
        return (
            <div className="stockList">
                {this.state.isFetching ? (<div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>) : this.getStockList()}
            </div>
        );
    }

    /**
     * Fetches stock data from server
     */
    fetchStocks(){
        this.setState({isFetching: true});
        fetch(process.env.SERVICE_URL + "data/stocks", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "get"
            })
        })
            .then((response) => response.json())
            .then(json => this.receiveStocks(json));
    }

    /**
     * Handles response from server
     */
    receiveStocks(response){
        this.setState({stocks: response, isFetching: false});
    }


    /**
     * Returns a list of all stocks
     */
    getStockList(){
        return (<ul>
            {this.state.stocks.map((stock, index) => {
                return <li key={"stockListing" + index}>
                    <Route exact path={"/stocks/" + stock.stockId} children={({match}) => {
                        return (
                            <Link to={"/stocks/" + stock.stockId} className={match ? "active" : ""}>
                                <span className="stockSymbol">{stock.stockSymbol}</span>
                                <span className="stockName">{stock.stockName}</span>
                            </Link>
                        );
                    }}/>
                </li>;
            })}
        </ul>);
    }
}
