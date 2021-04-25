exports.status = function (path, routes) {
    routes.forEach(item => {
        if ((item.path === '/ping') && (path === '/ping')) {
            console.log('>>>>>>>>>>>>>>>>>>> ping')
            pingAction()
        } else if ((item.path === '/echo') && (path === '/echo')) {
            echoAction()
            console.log('>>>>>>>>>>>>>>>>>>> echo')

        } else {
            return 'NO SUCH METHOD AND PATH'
        }
    })


}
let pingAction = function () {
    return `{ "active": true }`
}

let echoAction = function () {
    return `{ "echo": "user1" }`
}