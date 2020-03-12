const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.post('/api/oauth/v2/token', (req, res) => {
    res.send({
        access_token: "1",
        expires_in: 3600
    })
})

server.get('/api/validate', function (req, res) {
    const header = req.get("authorization")
    if (!header) {
        res.status(401).send({
            status: 401,
            developer_message: "Se requiere autenticación OAuth",
            user_message: "Se requiere autenticación",
            error_code: 1,
            more_info: "http://localhost:8000/api/doc"
        })
    }

    switch (header) {
        case "Bearer 1":
            res.redirect('/usuarios/1')
            break;
        case "Bearer 2":
            res.redirect('/usuarios/2')
            break;
        case "Bearer 3":
            res.redirect('/usuarios/3')
            break;
        default:
            res.status(401).send({
                status: 401,
                developer_message: 'El token expiró o es inválido',
                user_message: "Error en la autenticación",
                error_code: 1,
                more_info: "http://localhost:8000/api/doc"
            })
    }
})

server.use(router)

server.listen(80, () => {
    console.log('JSON Server is running')
})