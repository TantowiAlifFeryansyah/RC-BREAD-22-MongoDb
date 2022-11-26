var express = require('express');
var router = express.Router();
var { ObjectID, ObjectId } = require('mongodb')

/* GET home page. */
module.exports = function (db) {
  const User = db.collection('siswa');

  router.get('/', async function (req, res, next) {
    try {
      const users = await User.find().toArray()
      res.json(users)
    } catch (err) {
      res.json({ err })
    }
  });

  router.post('/', async function (req, res, next) {
    try {
      const result = await User.insertOne(req.body)
      const user = await User.findOne({ _id: ObjectId(result.inseredId) })
      res.json(user)
    } catch (err) {
      res.json({ err })
    }
  });

  router.put('/:id', async function (req, res, next) {
    try {
      const result = await User.findOneAndUpdate({
        _id: ObjectId(req.params.id)
      }, {
        $set: {
          string: req.body.string,
          integer: req.body.integer,
          float: req.body.float,
          date: req.body.float,
          boolean: req.body.boolean
        }
      },{
          returnOriginal: false
        })
      res.json(result.value)
    } catch (err) {
      res.json({ err })
    }
  });

  router.delete('/:id', async function (req, res, next) {
    try {
      const result = await User.findOneAndDelete({
        _id: ObjectId(req.params.id)
      })
      res.json(result.value)
    } catch (err) {
      res.json({ err })
    }
  });

  return router;
}

