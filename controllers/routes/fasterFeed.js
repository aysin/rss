var express = require('express');
const {
    getAcastFeedFast
} = require('../views/rssFeed');
var router = express.Router();

router.get('/', function (req, res, next) {
    // Get Acast Feed and return:
    // title, url and the checksum of the MP3 files
    getAcastFeedFast().then(
        (feed) => res.json(feed)
    ).catch(
        (error) => res.status(500).json({
            'message': error.message
        })
    )
});

module.exports = router;