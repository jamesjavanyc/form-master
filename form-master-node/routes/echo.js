const router = require("express").Router();

router.post("/", async (req, res) => {
    console.log(req.body)
    res.status(200).json(req.body);
});

module.exports = router;