const jwt = require('jsonwebtoken')
const {admin} = require('../../models')

exports.authToken = async (req, res, next) => {
    try{
        const header = req.headers['authorization']
        console.log(header)
        const token = header && header.split(' ')[1]

        const userVerifiedId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err){
                return res.send({
                    status: 403,
                    message: err.message
                })
            }
            console.log(user)
            return user.id
        })

        const userVerified = await admin.findOne({
            where: {
                id: userVerifiedId
            },
            attributes: {
                exclude: ['cretadAt', 'updatedAt']
            }
        })

        req.userLogin = userVerified.dataValues
        next()
    }catch (err){
        console.error(err)
        res.send({
            message:"Internal server error"
        })
    }
}