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
router.get('/:repoName/issues', async function (req, res) {
    const response = await fetch(`https://api.github.com/repos/${req.user.username}/${req.params.repoName}/issues`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `token ${req.user.accessToken}`
        }
    });
    const issues = await response.json();
    res.json(issues);
})
module.exports = router;