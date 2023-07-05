const { ownership } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.getOwnership = async (req, res) => {
    try {
        const datas = await ownership.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });


        return res.json({ item: datas });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

exports.getOwnershipById = async (req, res) => {

    const id = req.params.id

    const data = await ownership.findOne({
        where: { id },
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    })
    res.send(data)
}

exports.PostOwnership = async (req, res) => {
    try {
        const data = req.body
        const save = await ownership.create(data)
        res.send(data)
    } catch (err) {
        console.error(err);
    }
}

exports.putOwnership = async (req, res) => {
    try {
        const update = await ownership.update({
            ownershipName: req.body.ownershipName,
            ownershipCode: req.body.ownershipCode
        },
            {
                where: {
                    id: req.params.id
                },
                returning: true
            })
        const panggil = await ownership.findOne({
            where: { id: req.params.id }
        })
        if (!panggil) {
            return res.status(404).send({
                message: 'data tidak ditemukan'
            })
        }
        res.send({
            status: 200,
            message: 'berhasil update data!',
            data: panggil
        })
    } catch (err) {
        console.error(err)
    }
}

exports.deleteOwnership = async (req, res) => {
    try {
        const call = await ownership.findOne({
            where: { id: req.params.id }
        })
        if (!call) {
            return res.status(404).send({
                message: 'data tidak ditemukan'
            })
        }

        let del = await ownership.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({
            message: 'berhasil hapus data',
        })
    } catch (err) {
        console.error(err)
    }
}