const { location } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.getLocation = async (req, res) => {
    try {
        const datas = await location.findAll({
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

exports.getLocationById = async (req, res) => {

    const id = req.params.id

    const data = await location.findOne({
        where: { id },
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    })
    res.send(data)
}

exports.postLocation = async (req, res) => {
    try {
        const data = req.body
        const save = await location.create(data)
        res.send(data)
    } catch (err) {
        console.error(err);
    }
}

exports.putLocation = async (req, res) => {
    try {
        const update = await location.update({
            address: req.body.address,
            mapUrl: req.body.mapUrl
        },
            {
                where: {
                    id: req.params.id
                },
                returning: true
            })
        const panggil = await location.findOne({
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

exports.deleteLocation = async (req, res) => {
    try {
        const call = await location.findOne({
            where: { id: req.params.id }
        })
        if (!call) {
            return res.status(404).send({
                message: 'data tidak ditemukan'
            })
        }

        let del = await location.destroy({
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