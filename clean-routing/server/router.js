const fs = require('fs')

exports.route = function route(url, aliases, res) {
    if (url === '/favicon.ico') return res.end()

    const path = url.split('?')[0]
    const querySTring = url.split('?')[1]
    let params
    if (querySTring) {
        params = querySTring.split('&').map(value => {
            let obj = {}
            obj[value.split('=')[0]] = value.split('=')[1]
            return obj

        })
    }
    let alias = aliases.find(obj => obj[path])
    alias = alias ? alias[path] : path

    let segments = alias.split('/')
    let moduleName = segments[1]
    let functionName = segments[2]

    try {
        fs.accessSync(`./modules/${moduleName}.js`, fs.constants.F_OK)
        const moduleObject = require(`./modules/${moduleName}`)
        res.end(moduleObject[functionName](params))
    } catch (e) {
        console.log(e)
        res.end('NOT FOUND')
    }
}