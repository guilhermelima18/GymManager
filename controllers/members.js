const fs = require("fs")
const data = require("../data.json")
const { age, date } = require("../date")

exports.index =  function (req, res) {
    return res.render("members/members", {members: data.members})
}

// Criar Membros
exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Por favor, preencha todos os dados!")
        }
    }

    let { avatar_url, name, birth, gender, services } = req.body

    const id = Number(data.members.length + 1)
    const created_at = Date.now()
    birth = Date.parse(birth)

    data.members.push({
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

        return res.redirect("/members")
    })
}

exports.create = function (req, res) {
    return res.render("members/create-members")
}

// Mostrar Membros
exports.show = function (req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function (member) {
        return member.id == id
    })

    if (!foundMember) return res.send("Membro não encontrado!")

    const member = {
        ...foundMember,
        age: age(foundMember.birth),
    }

    return res.render("members/show", { member })
}

// Editar Membros

exports.edit = function (req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function (member) {
        return member.id == id
    })

    if (!foundMember) return res.send("Membro não encontrado!")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth)
    }

    return res.render("members/edit", { member })
}

// Atualizar Membros

exports.update = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function (member, foundIndex) {
        if (id == member.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send("Membro não encontrado!")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Escrita errada")
    })

    return res.redirect(`/members/${id}`)
}

// Deletar Membros

exports.delete = function (req, res) {
    const {id} = req.body
    const filteredMembers = data.members.filter(function(member) {
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Erro na escrita")
    })

    return res.redirect("/members")
}