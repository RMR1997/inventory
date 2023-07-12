const { category } = require("../../models");


exports.getCategory = async (req, res) => {
    try {
        const datas = await category.findAll({
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

exports.getCategoryById = async (req, res) => {

    const id = req.params.id

    const data = await category.findOne({
        where: { id },
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    })
    res.send(data)
}

exports.postCategory = async (req, res) => {
    try {
        const data = req.body
        const save = await category.create(data)
        res.send(data)
    } catch (err) {
        console.error(err);
    }
}

exports.putCategory = async (req, res) => {
    try {
        const update = await category.update({
            categoryName: req.body.categoryName,
            categoryCode: req.body.categoryCode,

        },
            {
                where: {
                    id: req.params.id
                },
                returning: true
            })
        const panggil = await category.findOne({
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

exports.deleteCategory = async (req, res) => {
    try {
        const call = await category.findOne({
            where: { id: req.params.id }
        })
        if (!call) {
            return res.status(404).send({
                message: 'data tidak ditemukan'
            })
        }

        let del = await category.destroy({
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