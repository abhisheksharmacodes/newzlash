const express = require("express");
const router = express.Router();
const bodyParser = express.json();

router.use(bodyParser)

router.post('/login', (req, res) => {
    console.log(req.sessionID);
    const { username, password } = req.body
    if (req.session.authenticated) {
        res.json(req.session)
    } else {
        if (password == 'sdaf@!#ASDF123') {
            req.session.authenticated = true
            req.session.user = {
                username, password
            }
            res.json(req.session)
        } else {
            console.log(req.body)
            res.status(403).json({ msg: 'Bad Credentials' })
        }
    }

    res.send(200)
})

module.exports = router