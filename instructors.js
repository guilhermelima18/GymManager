const fs = require("fs");
const data = require("./data.json");

exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Por favor, preencha todos os dados!")
        }
    }

    req.body.date = Date.parse(req.body.date);
    req.body.created_at = Date.now();
    req.body.id = Number(data.instructors.length + 1);

    data.instructors.push(req.body)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Escrita errada!")

        return res.redirect("/");
    })
}