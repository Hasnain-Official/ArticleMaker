require("dotenv").config();
const fileName = 'Article Controller';
const { successHandler, errorHandler } = require('../constants/status.contants');
const {
    addArticle,
    updateArticle,
    getArticle,
    deleteArticle
}  = require('../services/article.service');


 exports.addArticle= async function(req, res) {
    try {
        const { user, body } = req;
        const resp = await addArticle(user, body); 
        return res.status(resp.status || 200).json(resp);
    } catch (err) {
        console.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong });
    };
}

 exports.updateArticle = async function(req, res) {
    try {
        const { params : {id : articleId}, body } = req;
        const resp = await updateArticle(articleId, body);
        return res.status(resp.status || 200).json(resp);
    } catch (err) {
        console.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong });
    }
}

exports.getArticle = async function(req, res){
    try {
        const {query : {id : articleId}} = req;
        const resp = await getArticle(articleId);
        return res.status(resp.status || 200).json(resp);
    } catch (err) {
        console.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong });
    }
}

exports.deleteArticle = async function(req, res){
    try {
        const { params : {id : articleId} } = req;
        const resp = await deleteArticle(articleId);
        return res.status(resp.status || 200).json(resp);
    } catch (err) {
        console.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong });
    }
}