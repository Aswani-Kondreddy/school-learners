const express = require("express");
const router = express.Router();
const Learner = require("../models/learner");
const requireLogin = require("../middleware/requireLogin");

router.get("/all-learners", (req, res) => {
    Learner.find()
        .then((learners) => {
            res.json({ learners });
        })
        .catch((err) => {
            console.log(err);
        });
});


router.get("/:learnerId", requireLogin, (req, res) => {
    Learner.findById(req.params.learnerId).then(learner => {
        console.log(learner);
        res.json(learner);
    }).catch((err) => {
        res.status(400).json("Error : " + err);
    });
});

module.exports = router;
