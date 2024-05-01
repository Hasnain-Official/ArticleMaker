const { successHandler, errorHandler } = require('../constants/status.contants');
const isUuid = require('is-uuid');
const { v4: uuidv4 } = require('uuid');
const Article = require('../schemas/article.schema');


exports.addArticle = async function(userData, body) {
    const {
        title,
        context,
    } = body;
    console.log("User - > ", userData);
    if(!title || !context || !userData.id) {
        return { status : 400, message : errorHandler.missing};
    }
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const newData = {
        id : uuidv4(),
        title: title,
        context: context,
        userId: userData.id,
        publishedDate: new Date(Date.now()).toLocaleString('en-US', options)
    }
    await Article.create(newData);
    return {
        status: 201,
        message: successHandler.created,
        data: newData,
    };
}

exports.updateArticle = async function(articleId, body) {
    const {
        title,
        context,
    } = body;
    if(!isUuid.v4(articleId)) {
        return { status : 422, message : errorHandler.idNotFound};
    }
    const updatedData = await Article.update({
        title: title,
        context: context
    }, {
        where : { id : articleId }
    })
    if (!updatedData) {
        return { status: 404, message: errorHandler.dataNotFound };
    }
    return { status : 200, message : successHandler.update, data : updatedData };
}

exports.getArticle = async function(articleId) {
    const query = {
        attributes : {exclude: ['createdAt', 'updatedAt']}
    }
    if(articleId && isUuid.v4(articleId)) {
        query['where'] = {
            id : articleId,
        };
    };
    const getData = await Article.findAll(query);
    if(!getData) {
        return { status : 409, message : errorHandler.dataNotFound};
    }
    return !getData.error
    ? { status: 200, message: successHandler.found, data: getData }
    : getData;
}

exports.deleteArticle = async function(articleId) {
    if(!isUuid.v4(articleId)) {
        return { status : 422, message : errorHandler.idNotExist};
    }
    const deletedData = await Article.destroy({
        where : {
            id : articleId,
        }
    });
    if (!deletedData) {
        return { status: 404, message: errorHandler.dataNotFound };
    }
    return { status : 200, message : successHandler.delete, data : deletedData }; 
}