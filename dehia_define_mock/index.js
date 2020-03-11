var express = require('express');
var multer = require('multer')
var upload = multer()
var app = express();

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

app.post("/api/v1.0/tareas/*/plano", upload.single("plano"),(req, res, next) => {
    console.log(`Plano`)
    console.log(req.body)
    console.log(req.file)
})

app.get("/", (req, res) => {
    res.send("define mock")
})


app.post("/api/v1.0/tareas", (req, res, next) => {
    res.send("OK")
})

app.get("*", (req, res, next) => {
    console.log("ok")
    res.send("OK")
})

console.log("define server running")

app.listen(80);