require('dotenv').config();
const fileName = 'Auth Middleware';
const jwt = require('jsonwebtoken');
const User = require('../schemas/user.schema');
const { errorHandler } = require('../constants/status.contants');

exports.tokenDecoder = async function(req, res, next) {
    try {
        if (!req.headers["authorization"]) {
            return res.status(419).json({ error: true, message: "Looks you are not logged in!" });
        }
        const { authorization } = req.headers;
        let token = authorization.split(" ")[1];

        jwt.verify(token, process.env.JWTSECRET, async (err, payload) => {
            if (err) return res.status(401).json({ error: true, message: "Session expired" });
            const getData = await User.findOne({
                where : {
                    id : payload.id
                },
                attributes : ['id', 'firstName', 'lastName']
            });
            if(!getData) {
                return res.status(401).json({error : true, message: errorHandler.userNotFound });
            }
            req.user = payload;
            next();
        });
    } catch(e) {
        console.error({ message : `Error in ${fileName} `, Error : e });
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong });
    }
}