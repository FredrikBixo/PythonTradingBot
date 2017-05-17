/**
 * Handles ratings data requests
 */
export default function handleRatingsRequest(req, res, next, connection){
    switch (req.body.action){
        case("get"): {
            getRatings(req, res, next, connection);
            break;
        } default: {
            break;
        }
    }
}

/**
 * Gets rating records from the database
 */
function getRatings(req, res, next, connection){
    if(req.body.columnized){
        getRatingsColumnized(req, res, next, connection);
    } else {
        let queryStr = "select * \
            from ratings \
            inner join stocks on stocks.stockId = ratings.stockId \
            inner join algorithms on algorithms.algorithmId = ratings.algorithmId";
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
 * Gets ratings where each algorithm has it's own column
 */
function getRatingsColumnized(req, res, next, connection){
    let queryString = "SELECT * FROM algorithms; \
        SET @sql = NULL; \
        SELECT \
          GROUP_CONCAT(DISTINCT  \
            CONCAT( \
              'IFNULL(IF(algorithmId = \"', \
              algorithmId, \
              '\", ratingScore, 0), 0) AS algorithm', \
              algorithmId, 'Rating, ' \
              'ratingComputed AS algorithm', algorithmId, 'Computed' \
            ) \
          ) INTO @sql \
        FROM ratings; \
        SET @sql = CONCAT('SELECT stocks.stockId as stockId, stockName, stockSymbol, ', @sql, ' FROM ratings \
        right join stocks on stocks.stockId=ratings.stockId \
        '); \
        PREPARE stmt FROM @sql; \
        EXECUTE stmt;"
    connection.query(queryString, (err, results, fields) => {
        if (err){
            throw err;
        }
        res.json({algorithms: results[0], ratings: results[5]});
        next();
    });
}
