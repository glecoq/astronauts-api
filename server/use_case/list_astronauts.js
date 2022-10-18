const handler = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var sql = "SELECT * FROM `astronaut`.Astronaut";
    const result = await connection.query(sql);
    res.end(JSON.stringify(result));
};

module.exports = handler;