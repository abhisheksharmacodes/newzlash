const express = require("express");
const router = express.Router();
const User = require("../models/user.js")
const bodyParser = express.json();

router.use(bodyParser)

router.post("/adduser", async (req, res) => {
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        action_plan: [],
        task_channels: [],
        daily: {},
        today: {}
    })
    try {
        const u1 = await user.save()
        res.json(u1)
    }
    catch (err) {
        res.send("error" + err)
    }
})

router.get("/getuser", async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    }
    catch (err) {
        res.send("ERROR" + err)
    }
})
//GET route to recieve task by id
router.get("/get/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    }
    catch (err) {
        res.send("ERROR" + err)
    }
})

router.put("/update/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.fname = req.body.fname
        user.lname = req.body.lname
        user.email = req.body.email
        user.password = req.body.password
        user.action_plan = req.body.action_plan
        user.task_channels = req.body.task_channels
        user.daily = req.body.daily
        user.today = req.body.today
        const a1 = await user.save()
        res.json(a1)
    }
    catch (err) {
        res.send("Error")
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        User.deleteOne({ _id: id })
            .then((data) =>
                res.json({
                    data: data,
                })
            )
            .catch((error) => {
                return res.send(error);
            });
    }
    catch (err) {
        res.send("Error" + err)
    }
})

module.exports = router