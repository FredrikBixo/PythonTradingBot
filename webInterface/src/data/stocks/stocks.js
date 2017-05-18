/**
 * Handles stock data requests
 */
export default function handleStocksRequest(req, res, next, connection){
    switch (req.body.action){
        case("get"): {
            getStocks(req, res, next, connection);
            break;
        } default: {
            break;
        }
    }
}

/**
 * Gets stock records from the database
 */
function getStocks(req, res, next, connection){
    if(req.body.stockId){
        getIndividualStock(req, res, next, connection);
    } else {
        let queryStr = "select * \
            from stocks";
        if(req.body.limit){
            queryStr += " limit " + connection.escape(req.body.limit);
        }
        connection.query(queryStr, (err, results, fields) => {
            if (err){
                throw err;
            }
            res.json(results);
            next();
        });
    }

}

/**
 * Gets all relevant data for a particular stock
 */
function getIndividualStock(req, res, next, connection){
    let queryString = "SELECT * FROM algorithms; \
        SELECT * FROM stocks \
        INNER JOIN markets on markets.marketId = stocks.marketId \
        WHERE stockId = " + connection.escape(parseInt(req.body.stockId)) + "; \
        SELECT * FROM ratings WHERE stockId = " +
         connection.escape(parseInt(req.body.stockId)) +
         " ORDER BY ratingComputed DESC;";
    connection.query(queryString, (err, results, fields) => {
        if (err){
            throw err;
        }
        res.json({algorithms: results[0], stock: results[1][0], ratings: results[2]});
        next();
    });
}
