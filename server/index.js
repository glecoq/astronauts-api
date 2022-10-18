const Router = require("./router");
const initDb = require("./init_db");
const http = require("http");
const { exit } = require("process");

function initApp(nbRetry) {
    console.log("nbRetry=", nbRetry);
    if (nbRetry < 0) {
        console.error("Can't be connected to the database after retry");
        exit(1);
    }

    initDb().then(() => {
        const server = http.createServer(Router.run);
        server.listen(8080);
    }, (_err) => setTimeout(() => initApp(nbRetry - 1), 2000)).catch((err) => console.log(err));
}

initApp(5);