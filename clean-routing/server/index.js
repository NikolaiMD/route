const http = require('http');
const {host, port, access_key} = require('./config.json')
const {Route, routeResolve} = require('./route')
const {route} = require('./router')
const products = require('./modules/products')
const routesAliases = [
    {'/products': '/products/all'},
    {'/clients': '/clients/all'},
]

Route.add({path: "/ping", module: "status", action: "pingAction"})
Route.add({path: "/echo", module: "status", action: "echoAction"})

const server = http.createServer(({url}, res) => {
    // route(url, routesAliases, res)
    routeResolve(url, (action) => {    // < this is the cb()
        res.end(action())
    })
})


server.listen(port, host, () => {
    console.log(`Test server running on http://${host}:${port}`)
})