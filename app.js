require("dotenv").config();
const app = require("express")();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./src/routes/routes");
const { connectDb } = require("./config/sequelize.config");

connectDb(app);

app.use(bodyParser.json());

// pre-login source verification
app.use(cors({
    origin : '*'
}));

app.use(routes);

// no requested routes matched 
app.use("*", (req, res) => {
    res.status(404);
    return res.json({
        status: false,
        message: 'The Page you are looking for does not exists',
    });
})

app.on('ready', () => {
    // app is listening on PORT
    app.listen(PORT, (req, res) => {
        console.log("----------------------------------------");
        console.log("Server is Listening on - > ", PORT);
        console.log("----------------------------------------");
    });
});
