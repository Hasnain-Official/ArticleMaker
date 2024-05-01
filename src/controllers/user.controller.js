require("dotenv").config();
const fileName = 'User Controller';
const { successHandler, errorHandler } = require('../constants/status.contants');
const { register, login, getProfile } = require('../services/user.service');


exports.register = async function(req, res) {
    try {
        const { body } = req;
        const resp = await register(body); 
        return res.status(resp.status || 200).json(resp);
    } catch (err) {
        console.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong });
    };
}


exports.login = async function(req, res) {
    try {
        const { body } = req;
        const resp = await login(body); 
        return res.status(resp.status || 200).json(resp);
    } catch (err) {
        console.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong });
    };
}

exports.getProfile = async function(req, res) {
    try {
        const {user : { id }} = req;
        const resp = await getProfile(id);
        return res.status(resp.status || 200).json(resp);
    } catch(err) {
        console.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong });
    }
}

