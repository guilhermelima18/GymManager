const express = require("express");
const routes = express.Router();

routes.get("/instrutores", (req, res) => {
    return res.render("instrutores/index.html")
});

routes.get("/alunos", (req, res) => {
    return res.render("alunos/alunos.html")
});

module.exports = routes;