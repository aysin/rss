const axios = require('axios')
const ssri = require('ssri')
const Parser = require('rss-parser');
const parser = new Parser();
const https = require("https");

module.exports.getAcastFeed = async () => {
  try {
    const feed = await parser.parseURL('https://rss.acast.com/mydadwroteaporno')
    const feedBody = feed.items.map(item => ({
      title: item.title,
      url: item.enclosure.url,
    })).slice(0, 5)
    for (let item of feedBody) {
      const episodeMp3 = await axios({
        method: 'get',
        url: item.url,
        responseType: 'stream'
      })
      console.log('checking checksum')
      const checksum = await ssri.fromStream(episodeMp3.data)
      item.checksum = checksum
    }
    return feedBody
  } catch (e) {
    throw new Error('The request has failed!')
  }
}

module.exports.getAcastFeedFast = async () => {
  // Faster way of getting the checksum
  try {
    const feed = await parser.parseURL('https://rss.acast.com/mydadwroteaporno')
    const feedBody = feed.items.map(item => ({
      title: item.title,
      url: item.enclosure.url,
    })).slice(0, 50)

    for (const item of feedBody) {
      await new Promise(resolve => {
        var agent = new https.Agent({
          keepAlive: true,
          maxSockets: 1,
          keepAliveMsecs: 3000
        })
        https.get(item.url, {
          agent
        }, res => {
          let buff = Buffer.alloc(0);
          res.on('data', chunk => {
            buff = Buffer.concat([buff, chunk]);
            if (buff.length > 155) {
              res.destroy();
              item.checksum = ssri.fromData(buff.slice(100, 150))
              resolve()
            }
          });

          // res.on('close', () => console.log('closed'))
          // res.on('error', () => console.log('error'))
          // res.on('end', () => console.log('end'))
        })
      })
    }
    return feedBody
  } catch (e) {
    throw new Error('The request has failed!')

  }
}