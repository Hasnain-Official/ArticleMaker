const router = require("express").Router();
const { addArticle, updateArticle, getArticle, deleteArticle } = require('../../controllers/article.controller');
const { tokenDecoder } = require("../../middlewares/auth.middleware");

router.get('/', (req, res) => {
    return res.status(200).json({message : 'Article Routes'});
});

router.post('/add', tokenDecoder, addArticle);
router.put('/update/:id', tokenDecoder, updateArticle);
router.get('/all', getArticle);
router.delete('/delete/:id', tokenDecoder, deleteArticle);


module.exports = router;