const handler = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var sql = "SELECT * FROM `astronaut`.Astronaut";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.end(JSON.stringify(result));
    });
};

module.exports = handler;