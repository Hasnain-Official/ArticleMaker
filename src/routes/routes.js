const router = require("express").Router();
const userRoutes = require("./v1/user.route");
const articleRoutes = require("./v1/article.route");

router.get("/", (req, res) => {
    return res.status(200).json({message : "Welcome to the Home route of the "})
});

router.use('/api/v1', userRoutes);

router.use('/api/v1/article', articleRoutes);

module.exports = router;