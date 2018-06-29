const express = require ("express");
const app = express();
const parser = require ("body-parser");
const db = require("./models"); //.default;
const path = require("path")

<<<<<<< HEAD
const routes = require ("./routes");
const PORT = process.env.port || 3001;
=======
const routes = require ("./routes")
const PORT = process.env.port || 3001
>>>>>>> kevin

app.use(parser.urlencoded({extended: false}));
app.use(parser.json());
app.use(routes);
// app.get("*", res.sendfile(path.join(__dirname, "./client/public/index.html")) );`

db.sequelize.sync().then(function() {
    app.listen(PORT, () => {
        console.log(`listening on ${PORT}`);
    });
});

