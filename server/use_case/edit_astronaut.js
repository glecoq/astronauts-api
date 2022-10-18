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
    let sql = "SELECT id from `astronaut`.Astronaut where last_name = ? and name = ?";
    let result = await connection.query({ sql: sql, values: [last_name, first_name] });
    if (result.length === 0) {
        res.end(JSON.stringify({ error: "record not found" }));
        return;
    }
    console.log("record found = ", result);
    sql = "UPDATE `astronaut`.Astronaut SET ";
    for (const [key, value] of Object.entries(req.data.payload)) {
        sql += `${key} = ${value}`;
    }

    result = await connection.query({ sql: sql });
    res.end(JSON.stringify(result));
};

module.exports = handler;