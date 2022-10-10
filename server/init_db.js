const mysql = require('mysql');
const config = require("./config");

global.connection = mysql.createConnection({
    ...config['db']
});

const init = () => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: config['db'].host,
            user: config['db'].user,
            password: config['db'].password,
        });

        connection.connect(function (err) {
            if (err) reject(err);
            console.info("Connected!");
            connection.query("CREATE DATABASE IF NOT EXISTS astronaut", function (err, result) {
                if (err) reject(err);
                console.info("Database created");
                connection.query('CREATE TABLE IF NOT EXISTS `astronaut`.Astronaut (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,name VARCHAR(20),last_name VARCHAR(30),age INT, INDEX idx_name (last_name,name));', function (err) {
                    if (err) reject(err);
                    console.info('Astronaut TABLE created.');
                    connection.end();
                    resolve();
                });
            });
        });
    });
}

module.exports = init;