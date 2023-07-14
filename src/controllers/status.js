const { status } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


exports.getStatus = async (req, res) => {
    try {
        const datas = await status.findAll({
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

exports.getStatusById = async (req, res) => {

    const id = req.params.id

    const data = await status.findOne({
        where: { id },
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    })
    res.send(data)
}

exports.postStatus = async (req, res) => {
    try {
        const data = req.body
        const save = await status.create(data)
        res.send(data)
    } catch (err) {
        console.error(err);
    }
}

exports.putStatus = async (req, res) => {
    try {
        const update = await status.update({
            statusName: req.body.statusName

        },
            {
                where: {
                    id: req.params.id
                },
                returning: true
            })
        const panggil = await status.findOne({
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

exports.deleteStatus = async (req, res) => {
    try {
        const call = await status.findOne({
            where: { id: req.params.id }
        })
        if (!call) {
            return res.status(404).send({
                message: 'data tidak ditemukan'
            })
        }

        let del = await status.destroy({
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