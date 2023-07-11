const { asset } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

exports.getAsset = async (req, res) => {
    try {
        const datas = await asset.findAll({
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