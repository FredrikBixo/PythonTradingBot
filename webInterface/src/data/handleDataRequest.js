import getDatabaseConnection from "./connection";

import handleRatingsRequest from "./ratings/ratings";
import handleStocksRequest from "./stocks/stocks";

/**
 * Redirects API-requests to eachs respective function
 */
export default function handleDataRequest(req, res, next){
    let connection = getDatabaseConnection();
    if(req.url == "/data/ratings/" || req.url == "/data/ratings"){
        handleRatingsRequest(req, res, next, connection);
    } else if(req.url == "/data/stocks/" || req.url == "/data/stocks"){
        handleStocksRequest(req, res, next, connection);
    }
    connection.end();
}
