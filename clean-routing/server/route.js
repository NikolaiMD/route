const fs = require('fs')

class Route {
    static routes = []
    static add(route) {
        this.routes.push(route)  // + new method
    }
    static resolve(url, cb) {            // method that resolves the ROUTING process
    if (url === '/favicon.ico') return ''

        const path = url.split('?')[0]
        const status = url.split('?')[1]

        try {
            fs.accessSync(`./modules/${status}.js`, fs.constants.F_OK)
            const moduleObject = require(`./modules/${status}.js`)
            return (moduleObject[status](path, Route.routes))
        } catch (e) {
            console.log(e)
            return cb(falseAction)
        }
    }




}

function falseAction() {
    return `NOT FOUND`
}

exports.routeResolve = Route.resolve
exports.Route = Route