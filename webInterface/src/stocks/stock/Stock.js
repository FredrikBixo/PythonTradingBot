import React from "react";
import {render} from "react-redux";
import fetch from "isomorphic-fetch";
import {Link} from "react-router-dom";
import LineChart from "react-linechart";

if(process.env.BUILD_TARGET == "browser"){
    require("./styles.scss");
}


/**
 * Displays individual stock data
 */
export default class Stock extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isFetching: true,
            stock: null,
            ratings: null,
            algorithms: null
        }

        this.fetchStock = this.fetchStock.bind(this);
    }

    /**
     * Fetches the stock list
     */
    componentDidMount(){
        this.fetchStock(this.props.stockId);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.stockId != nextProps.stockId){
            this.fetchStock(nextProps.stockId);
        }
    }

    render(){
        return (
            <div className="stock">
                {this.state.isFetching ? (<div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>) : this.getStockInfo()}
                <canvas id="graphCanvas" width={300} height={400}></canvas>
            </div>
        );
    }

    /**
     * Fetches stock data from server
     */
    fetchStock(stockId){
        this.setState({isFetching: true});
        fetch(process.env.SERVICE_URL + "data/stocks", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "get",
                stockId: stockId
            })
        })
            .then((response) => response.json())
            .then(json => this.receiveStock(json));
    }

    /**
     * Handles response from server
     */
    receiveStock(response){
        this.setState({ratings: response.ratings, algorithms: response.algorithms, stock: response.stock, isFetching: false}, () => {this.setColors()});
    }

    /**
     * Generates random colors for each algorithm
     */
    setColors(){
        let tempAlgorithms = this.state.algorithms.slice();
        for(let i = 0; i < tempAlgorithms.length; ++i){
            tempAlgorithms[i].color = this.getRandomColor();

        }
        this.setState({algorithms: tempAlgorithms}, () => {
            this.drawCanvas()
        });
    }

    /**
     * Draws the graph on canvas
     */
    drawCanvas(){
        let canvas = document.getElementById("graphCanvas");
        let context = canvas.getContext("2d");
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        context.fillStyle="#999";
        context.fillRect(0, 0, width, height);

        let latestTime = new Date(this.state.ratings[0].ratingComputed).getTime();
        let firstTime = new Date(this.state.ratings[this.state.ratings.length - 1].ratingComputed).getTime();
        /*context.beginPath();
        context.moveTo(100, 0);
        context.lineTo(100, 200);
        context.strokeStyle = "#f00";
        context.stroke();*/
        //Draw daymarkers
        /*let numberOfDays = Math.floor((latestTime - firstTime) / 86400);
        console.log(context);
        for(let i = 0; i < numberOfDays; ++i){
            let x = (width / (numberOfDays + 1)) * (i + 1);
            context.beginPath();

            context.moveTo(x, 0);
            context.lineTo(x, height);
            context.lineWidth=1;
            context.strokeStyle = "#fff";
            context.stroke();
        }*/

        //Draw graphs
        this.state.algorithms.map((algorithm, algorithmIndex) => {


            let initialPoint = true;
            context.beginPath();
            this.state.ratings.map((rating, ratingIndex) => {
                let x = (new Date(rating.ratingComputed).getTime() - firstTime) * width / (latestTime - firstTime);
                let y = height - ((rating.ratingScore - algorithm.algorithmLowestScore) * height / (algorithm.algorithmHighestScore - algorithm.algorithmLowestScore));
                if(rating.algorithmId = algorithm.algorithmId){
                    if(initialPoint){
                        context.moveTo(x, y);
                        initialPoint = false;
                    } else {
                        context.lineTo(x, y);
                    }
                }
            });
            context.strokeStyle = algorithm.color;
            context.stroke();
        });
    }
    /**
     * Generates a random color
     */
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    /**
     * Returns a list of all stocks
     */
    getStockInfo(){
        console.log("STOCK", this.state.stock);
        return (<div className="stockInfo">
            <h1>{this.state.stock.stockSymbol}</h1>
            <h3>{this.state.stock.stockName}</h3>
            <span className="marketName">{this.state.stock.marketName}</span>
            <h4>Latest daily ratings</h4>
            {this.getLatestRatings()}
        </div>);
    }

    /**
     * Gets the latest ratings
     */
    getLatestRatings(){
        return (<div className="latestRatings">
            {this.state.algorithms.map((algorithm, index) => {
                let latestScore = null;
                for(let i = 0; i < this.state.ratings.length; ++i){
                    if(this.state.ratings[i].algorithmId == algorithm.algorithmId){
                        latestScore = this.state.ratings[i].ratingScore;
                        break;
                    }
                }
                return (<div className="latestRating" key={"latestRating" + index}>
                    <div className="scoreBox" style={{backgroundColor: algorithm.color}}><span>
                        {latestScore}
                    </span></div>
                    <div className="algorithmName"><span>
                        {algorithm.algorithmName}
                    </span></div>
                </div>);
            })}
        </div>)
    }
}
