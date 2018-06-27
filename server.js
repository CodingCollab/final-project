const express = require ("express");
const app = express();
const parser = require ("body-parser");
const db = require("./models"); //.default;

const routes = require ("./routes");
const PORT = process.env.port || 3000;

app.use(parser.urlencoded({extended: false}));
app.use(parser.json());
app.use("/", routes);

db.sequelize.sync().then(function() {
    app.listen(PORT, () => {
        console.log(`listening on ${PORT}`);
    });
});
