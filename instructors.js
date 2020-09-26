const fs = require("fs")
const data = require("./data.json")
const { age, date } = require("./date")

// Criar Instrutores
exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Por favor, preencha todos os dados!")
        }
    }

    let { avatar_url, name, birth, gender, services } = req.body

    const id = Number(data.instructors.length + 1)
    const created_at = Date.now()
    birth = Date.parse(birth)

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return res.send("Escrita errada!")
        }

        return res.redirect("/")
    })
}

// Mostrar Instrutores
exports.show = function (req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instrutor não encontrado!")

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat('en-GB').format(foundInstructor.created_at),
    }

    return res.render("show", { instructor })
}

// Editar Instrutores

exports.edit = function (req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instrutor não encontrado!")

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return res.render("edit", { instructor })
}

// Atualizar Instrutores

exports.update = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function (instructor, foundIndex) {
        if (id == instructor.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) return res.send("Instrutor não encontrado!")

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Escrita errada")

        return res.redirect("/")
    })
}