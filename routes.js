const express = require("express")
const routes = express.Router()
const instructors = require("./controllers/instructors")
const members = require("./controllers/members")

// Routes of Instructors
routes.get("/", (req, res) => {
    res.render("index.njk")
})

routes.get("/instructors", instructors.index)

routes.get("/create-instructors", instructors.create)

routes.get("/instructors/:id/edit", instructors.edit)

routes.get("/instructors/:id", instructors.show)

routes.post("/", instructors.post)

routes.put("/instructors", instructors.update)

routes.delete("/instructors", instructors.delete)


// Routes of Members
routes.get("/members", (req, res) => {
    return res.render("members/members")
})

routes.get("/members", members.index)

routes.get("/create-members", members.create)

routes.get("/members/:id/edit", members.edit)

routes.get("/members/:id", members.show)

routes.post("/", members.post)

routes.put("/members", members.update)

routes.delete("/members", members.delete)

module.exports = routes;