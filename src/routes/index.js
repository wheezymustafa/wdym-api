var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;


const url = 'mongodb://wdymadmin:C0starica@localhost:27017/?authSource=admin';
const gameAssetsDbName = 'GameAssets';
// Connect using MongoClient

router.get('/', (req, res) => res.send('Hello WDYM!'))

// mongoClient.connect(url, {useUnifiedTopology: true})
//   .then(client => {
//     console.log("connected")
//     const gameAssetsDb = client.db(gameAssetsDbName)

//     getAnswerCardsRoute(gameAssetsDb)
//     getImageCardsRoute(gameAssetsDb)
      
//   })

//   const getAnswerCardsRoute = (gameAssetsDb) => {
//     return router.get('/answerCards', function(req, res, next) {
//       const includeNsfwCards = req.query.includeNsfwCards
//       let fetchNsfwCardsQuery = {}
//       if (!includeNsfwCards) {
//         fetchNsfwCardsQuery = { isNsfw: { $ne: true}}
//       }

//       gameAssetsDb.collection("AnswerCards").find(fetchNsfwCardsQuery).toArray().then(results => {
//         res.send(results)
//       })    
//     })
//   }

//   const getImageCardsRoute = (gameAssetsDb) => {
//     return router.get('/imageCards', function(req, res, next) {
//       gameAssetsDb.collection("ImageCards").find({}).toArray().then(results => {
//         res.send(results)
//       })    
//     })
//   }


module.exports = router;
