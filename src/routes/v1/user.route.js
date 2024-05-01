const router = require("express").Router();
const {register, login, getProfile} = require('../../controllers/user.controller');
const { tokenDecoder } = require("../../middlewares/auth.middleware");

router.get('/', (req, res) => {
    return res.status(200).json({message : 'User Routes'});
});

router.post('/register', register);

router.post('/login', login);

router.get('/get-profile', tokenDecoder, getProfile);


module.exports = router;