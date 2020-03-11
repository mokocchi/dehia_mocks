const jsonServer = require('json-server')
const app = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

app.use(middlewares)
var multer = require('multer')
var upload = multer()

app.use((req, res, next) => {
    console.log(`Called: ${req.method} ${req.path}`)
    next()
})

app.get("/api/v1.0/me", (req, res) => {
    res.send({
        "id": 1,
        "roles": ["ROLE_AUTOR"],
        "nombre": "Ana",
        "apellido": "González",
        "email": "autor1@dehia.net",
        "googleid": "1001"
    })
})

app.post("/api/v1.0/tareas/*/plano", (req, res, next) => {
    console.log(`Plano`)
    console.log(req)
    next()
})

app.post("/api/v1.0/tareas/*/plano", upload.single("plano"), (req, res, next) => {
    console.log(`Plano multer`)
    console.log(req.body)
    console.log(req.file)
})

app.get("/", (req, res) => {
    res.send("define mock")
})


app.post("/api/v1.0/tareas", (req, res, next) => {
    res.status(201).send("OK")
})

app.use(jsonServer.rewriter({
    '/api/v1.0/public/*': '/$1',
}))

app.use(router)

router.render = function (req, res) {
    if (req.url.match(/(s$|s-.+$)/)) {
        console.log("matched")
        res.jsonp({
            results: res.locals.data
         })
    } else {
        res.jsonp(res.locals.data)
    }
}

app.get("*", (req, res, next) => {
    console.log("ok")
    res.send("OK")
})

console.log("define server running")

app.listen(80);