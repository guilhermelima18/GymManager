const fs = require("fs");
const data = require("./data.json");

exports.show = function (req, res) {
    const {id} = req.params;
    const foundInstructor = data.instructors.find(function(instructor) {
        return instructor.id == id;
    })

    if (!foundInstructor) return res.send("Instrutor não encontrado!");

    return res.render("show.html", {instructor: foundInstructor});

    const instructor = {
        ...foundInstructor,
        age: "",
        genrer: "",
        modalitys: foundInstructor.modalitys.split(","),
        created_at: "",
    }
}

exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Por favor, preencha todos os dados!")
        }
    }

    let {avatar, name, date, genre, modalitys} = req.body;

    const id = Number(data.instructors.length + 1);
    const created_at = Date.now();
    date = Date.parse(date);

    data.instructors.push({
        id,
        avatar,
        name,
        date,
        genre,
        modalitys,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Escrita errada!")

        return res.redirect("/");
    })
}