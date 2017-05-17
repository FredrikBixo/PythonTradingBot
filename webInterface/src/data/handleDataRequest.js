import getDatabaseConnection from "./connection";

import handleRatingsRequest from "./ratings/ratings"

/**
 * Redirects API-requests to eachs respective function
 */
export default function handleDataRequest(req, res, next){
    let connection = getDatabaseConnection();
    if(req.url == "/data/ratings/" || req.url == "/data/ratings"){
        handleRatingsRequest(req, res, next, connection);
    }
    connection.end();
}
