const { successHandler, errorHandler } = require('../constants/status.contants');
const is_uuid = require('is-uuid');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user.schema');


exports.register = async function(body) {
    const {
        firstName,
        lastName,
        email,
        password,
        age
    } = body;
    if(!firstName ||
        !lastName ||
        !email ||
        !password || 
        !age
    ) {
        return { status: 400, message: errorHandler.missing };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { status : 400, message: 'Invalid email format' };
    }
    const existingData = await User.findOne({
        where : {
            email : email,
        }
    });
    if(existingData) {
        return { status : 409, message : errorHandler.emailAlreadyExist };
    }
    const newData = {
        id : uuidv4(),    
        firstName: firstName,
        lastName : lastName,
        email: email,
        password: password,
        age: age
    }

    await User.create(newData);
    delete newData['password'];
    return {
        status: 201,
        message: successHandler.signUp,
        data: newData,
    };
}

exports.login = async function(body) {
    const {
        email,
        password
    } = body;
    if (!email && !password) {
        return { status: 400, message: errorHandler.missing };
    }
    if (!email && password) {
        return { status: 400, message: errorHandler.email };
    }
    if (email && !password) {
        return { status: 400, message: errorHandler.password };
    }
    const userData = await User.findOne({ 
        where : {
            email: email
        },
        attributes : ['id', 'firstName', 'lastName', 'age', 'email', 'password']
    });

    if(!userData) {
        return { status: 400, message: errorHandler.incorrectEmail };
    }
    if(!(password === userData?.dataValues.password)) {
        return {status : 400, message : errorHandler.incorrectPassword};
    };
    const accessToken = jwt.sign({
        id : userData?.dataValues?.id,
        firstName : userData?.dataValues?.firstName,
        lastName: userData?.dataValues?.lastName,
        email: userData?.dataValues?.email
    }, 
    process.env.JWTSECRET,
    { 
        expiresIn: process.env.ACCESSTOKENEXPIRATIONTIME || "10h" ,
    });
    const refreshToken = jwt.sign({
        id : userData?.dataValues?.id,
        firstName : userData?.dataValues?.firstName,
        lastName: userData?.dataValues?.lastName,
        email: userData?.dataValues?.email
    }, 
    process.env.JWTSECRET,
    { 
        expiresIn: process.env.REFRESHTOKENEXPIRATIONTIME || "7d" ,
    });
    delete userData['dataValues']['password'];
    return {
        status: 200,
        message: successHandler.login,
        user_data : userData.dataValues,
        access_token : accessToken,
        refresh_token : refreshToken,
    };
}

exports.getProfile = async function(id) {
    if(!(id || (id && is_uuid.v4(id)))) {
        return { status : 400, message : errorHandler.idNotFound};
    }
    const getData = await User.findOne({
        where : {
            id : id
        },
        attributes : ['id', 'firstName', 'lastName', 'age', 'email']
    });
    if(!getData) {
        return { status: 400, message: errorHandler.dataNotFound };
    }
    return !getData.error
    ? { status: 200, message: successHandler.found, userData: getData }
    : getData;
}