const Tweet = require('mongoose').model('Tweet')
const Tag = require('mongoose').model('Tag')
const errorHandler = require('../utilities/error-handler')

let parseHastag = function (string) {
  let patern = /(?:^|[ ])#([a-zA-Z]+)/gm
  let result = string.match(patern)
  return result
}

module.exports = {
  tweetGet: (req, res) => {
    res.render('tweets/add')
  },
  tweetPost: (req, res) => {
    let reqTweet = req.body

    if (reqTweet.message.length === 0) {
      res.locals.globalError = 'Message cannot be empty!'
      res.render('tweets/add', reqTweet)
      return
    }
    let arrayTags = (parseHastag(reqTweet.message.toString()))
    console.log(arrayTags)

    
    Tweet.create({
      message: reqTweet.message,
      creator: req.user._id
    }).then(
      () => {
        if (arrayTags) {
          for (let i = 0; i < arrayTags.length; i++) {
            let tag = arrayTags[i].replace('#', '')
            Tag.create({
              name: tag.toLower()
            })
          }
        }
      },
      res.redirect('/tweets/list')
    ).catch(err => {
      let errorMsg = errorHandler.handleMongooseError(err)
      res.locals.globalError = errorMsg
      res.render('tweets/add', reqTweet)
    })
  },
  list: (req, res) => {
    Tweet
        .find({})
        .sort('-creationDate')
        .populate({ path: 'creator' })
        .limit(100)
        .then(tweets => {
          res.render('tweets/list', {
            tweets: tweets
          })
        })
  }
}
