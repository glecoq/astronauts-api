const Router = require("./router");
const initDb = require("./init_db");
const http = require("http");

initDb().then(() => {
    const server = http.createServer(Router.run);
    server.listen(8080);
}).catch((err) => console.log(err));