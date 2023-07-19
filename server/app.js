const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());

const fs = require("fs");

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log("Server started"));

app.use(express.static("build"));

function readJsonFileSync(filepath, encoding) {
    if (typeof (encoding) == "undefined") {
        encoding = "utf8";
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file) {
    var filepath = __dirname + "/" + file;
    return readJsonFileSync(filepath);
}

// app.get("/api/places", (req, res) => {
//     res.send(getConfig("PlacesGiberish.json"));
//     console.log("Sending places...");
// });
//
// app.get("/api/articles", (req, res) => {
//     res.send(getConfig("ArticlesGiberish.json"));
//     console.log("Sending articles...");
// });