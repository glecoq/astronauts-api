const handler = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (!(req.data.payload !== undefined
        && req.data.payload.name !== undefined
        && typeof req.data.payload.name === "string"
        && typeof req.data.payload.last_name === "string"
        && typeof req.data.payload.age === "number")) {
        res.status = 400;
        res.end(JSON.stringify({ error: "invalid input" }));
        return;
    }
    var sql = "INSERT INTO `astronaut`.Astronaut (name, last_name, age) VALUES (?, ?, ?)";
    await connection.query({ sql: sql, values: [req.data.payload.name, req.data.payload.last_name, req.data.payload.age] });
    res.end(JSON.stringify(req.data.payload));
};

module.exports = handler;