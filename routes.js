const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
    return res.render("index.html")
});

routes.get("/alunos", (req, res) => {
    return res.render("alunos.html")
});

module.exports = routes;