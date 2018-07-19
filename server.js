const express = require ("express");
const app = express();
const parser = require ("body-parser");
const db = require("./models"); //.default;
const path = require("path");
// const env = require("dotenv"); //.config("./config/config.js", "config.js"); //.load();
const env = require("dotenv");

app.use(express.static('client/build'))

env.load(path.resolve('./config/config', 'config.js'));
const routes = require ("./routes");
const PORT = process.env.PORT || 3001;

app.use(parser.urlencoded({extended: false}));
app.use(parser.json());
app.use(routes);

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// app.get("*", res.sendfile(path.join(__dirname, "./client/public/index.html")) );`
// console.log(process.env)
db.sequelize.sync().then(function() {
    app.listen(PORT, () => {
        console.log(`listening on ${PORT}`);
    });
});

