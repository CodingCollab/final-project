const express = require ("express");
const app = express();
const parser = require ("body-parser")

const routes = require ("./routes")
const port = process.env.port || 8080

app.use(parser.urlencoded({extended: false}))
app.use(parser.json())
app.use("/", routes)

app.listen(port, () =>console.log(`listening on ${port}`))

