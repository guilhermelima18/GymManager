const express = require("express")
const routes = express.Router()
const instructors = require("./instructors")

routes.get("/", (req, res) => {
    res.render("instructors/index")
})

routes.get("/instructors", instructors.index)

routes.get("/create-instructors", (req, res) => {
    return res.render("instructors/create-instructors")
})

routes.get("/instructors/:id/edit", instructors.edit)

routes.get("/instructors/:id", instructors.show)

routes.post("/", instructors.post)

routes.put("/instructors", instructors.update)

routes.delete("/instructors", instructors.delete)

routes.get("/members", (req, res) => {
    return res.render("members/members")
});

module.exports = routes;