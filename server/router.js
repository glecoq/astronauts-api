const url = require("url");
const addAstronaut = require("./use_case/add_astronaut");
const listAstronauts = require("./use_case/list_astronauts");
const editAstronaut = require("./use_case/edit_astronaut");

let Router = {};

Router.routes = [
    {
        name: 'astronauts', method: 'GET', callback: listAstronauts
    },
    {
        name: 'astronauts', method: 'PUT', callback: editAstronaut
    },
    {
        name: 'astronaut', method: 'POST', callback: addAstronaut
    }
];

Router.run = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;
    const trimmedPath = pathname.replace(/^\/+|\/+$/g, '');
    const targetMethod = req.method.toLocaleUpperCase();

    let buffer = '';
    req.on('data', (data) => buffer += Buffer.from(data).toString('utf8'));
    req.on('end', () => {
        console.info("data = ", buffer);
        let targetHandler = Router.routes.filter(({ name, method }) => {
            return name === trimmedPath && method == targetMethod
        })[0];

        console.info("targetHandler = ", targetHandler);

        // use to override default status code (200) in 
        res.status = (status) => {
            res.tempStatus = status
            return res
        }

        res.json = (obj) => {
            if (typeof (obj) !== 'object') {
                console.warn("can't convert to json: invalid objet");
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = res.tempStatus ? res.writeHead(res.tempStatus) : res.writeHead(200);
                try {
                    res.end(JSON.stringify(obj));
                } catch (error) {
                    res.end('{}');
                }
            }
        }

        req.data = {}
        if (buffer.length > 0) {
            req.data.payload = JSON.parse(buffer);
        }
        req.data.query = query;

        if (typeof targetHandler !== "undefined") {
            console.info(`[${targetHandler.method.toLocaleUpperCase()}] / ${targetHandler.name}`)
            targetHandler.callback(req, res);
        } else {
            targetHandler = {};
            targetHandler.callback = () => console.log("not found route name");
        };
    });
};

module.exports = Router;