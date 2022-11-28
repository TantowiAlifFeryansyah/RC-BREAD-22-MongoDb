var express = require('express');
var router = express.Router();
var { ObjectID, ObjectId } = require('mongodb')

/* GET home page. */
module.exports = function (db) {
  const User = db.collection('siswa');

  router.get('/', async function (req, res, next) {
    try {
      const users = await User.find().toArray()
      res.render('list', { data: users })
    } catch (err) {
      console.log(`list error`, err);
    }
  });

  router.get('/add', async function (req, res, next) {
    try {
      res.render('add')
    } catch (err) {
      console.log(`add error`, err);
    }
  });

  router.post('/add', async function (req, res, next) {
    try {
      await User.insertOne({
          string: req.body.string,
          integer: Number(req.body.integer),
          float: parseFloat(req.body.float),
          date: req.body.date,
          boolean: JSON.parse(req.body.boolean)
      })
      res.redirect('/')
    } catch (err) {
      res.json({ err })
    }
  });

  router.get('/edit/:id', async function (req, res, next) {
    try {
      const users = await User.find({_id: ObjectId(req.params.id)}).toArray()
      res.render('edit',{ data: users[0] })
    } catch (err) {
      console.log(`edit error`, err);
    }
  });

  router.post('/edit/:id', async function (req, res, next) {
    try {
      const result = await User.findOneAndUpdate({
        "_id": ObjectId(`${req.params.id}`)
      }, {
        $set: {
          string: req.body.string,
          integer: Number(req.body.integer),
          float: parseFloat(req.body.float),
          date: req.body.date,
          boolean: JSON.parse(req.body.boolean)
        }
      }, {
        returnOriginal: false
      })
      res.redirect('/');
    } catch (err) {
      console.log(`add error`, err);
    }
  });

  router.get('/delete/:id', async function (req, res, next) {
    try {
      const result = await User.findOneAndDelete({
        _id: ObjectId(req.params.id)
      })
      res.redirect('/')
    } catch (err) {
      console.log(`delete error`, err);
    }
  });

  return router;
}

