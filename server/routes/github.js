const express = require('express');
const router = express.Router()

router.get('/repos', async function (req, res) {
    const response = await fetch('https://api.github.com/user/repos', {
        headers: {
            'Authorization': `token ${req.user.accessToken}`
        }
    })
    const parsedRes = await response.json();
    res.json(parsedRes);
})
module.exports = router;