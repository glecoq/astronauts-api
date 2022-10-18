const mysql = require('promise-mysql');
const config = require("./config");

async function createStructureIfNotExist(connection) {
    await connection.query("CREATE DATABASE IF NOT EXISTS astronaut");
    await connection.query('CREATE TABLE IF NOT EXISTS `astronaut`.Astronaut (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,name VARCHAR(20),last_name VARCHAR(30),age INT, INDEX idx_name (last_name,name));');
}

const init = async () => {
    const connection = await mysql.createConnection({
        host: config['db'].host,
        user: config['db'].user,
        password: config['db'].password,
    });
    global.connection = connection;
    await createStructureIfNotExist(connection);
}

module.exports = init;