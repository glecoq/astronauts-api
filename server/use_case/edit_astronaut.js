const handler = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (!(req.data.payload !== undefined
        && req.data.payload.name !== undefined
        && req.data.payload.last_name !== undefined
        && typeof req.data.payload.name === "string"
        && typeof req.data.payload.last_name === "string"
    )) {
        res.status = 400;
        res.end(JSON.stringify({ error: "invalid input" }));
        return;
    }

    const last_name = req.data.payload.last_name;
    const first_name = req.data.payload.name;
    delete req.data.payload.last_name;
    delete req.data.payload.name;
    console.log("payload=", req.data.payload);
    var sql = "SELECT id from `astronaut`.Astronaut where last_name = ? and name = ?";
    connection.query({ sql: sql, values: [last_name, first_name] }, function (err, result) {
        if (err) throw err;

        if (result.length === 0) {
            console.log(result);
            res.end(JSON.stringify({ error: "record not found" }));
            return;
        }

        console.log("record found = ", result);
        let sql = "UPDATE `astronaut`.Astronaut SET ";
        for (const [key, value] of Object.entries(req.data.payload)) {
            sql += `${key} = ${value}`;
        }

        connection.query({ sql: sql }, function (err, result) {
            if (err) throw err;
            res.end(JSON.stringify(result));
        });
    });
};

module.exports = handler;