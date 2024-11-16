const { SECRET } = require('../config/config')
var jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const auth = req.get("Authorization")
    const tags = auth.split(" ")

    try {
        if (tags[0] != "Bearer") return res.status(403).json({ message: "Invalid token" })

        const decoded = jwt.verify(tags[1], SECRET);
        if (decoded) return next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({
            message: "Invalid token"
        })
    }
    
    return res.status(403).json({
        message: "Invalid token"
    })
}

module.exports = checkToken