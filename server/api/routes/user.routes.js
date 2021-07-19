const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const checkAuth = require('../middleware/checkAuth');
const UserModel =  require('../model/user.model');


//   1. Register Route.

router.post('/register', (req,res,next) => {
  UserModel
  .find({email: req.body.email})
  .then((result) => {
    if(result.length >= 1) 
      return res.status(409).json({
        msg:'Email Already Exist.'
      })
    bcrypt.hash(req.body.password, 10, (error, hash) => {
      if(error)
        return res.status(500).json({
          msg: error.message
        })
      const payload = {
        _id: result._id,
        name: result.name,
        email: result.email
      }
      jwt.sign(payload, process.env.PRIVATE_KEY, {expiresIn: '1h'}, (error, token) => {
        if(error)
          return res.status(500).json({
            msg: error.message
          })
        const SaveUser = new UserModel({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email: req.body.email,
          gender: req.body.gender,
          phone: req.body.phone,
          password: hash
        })
        SaveUser
        .save()
        .then((result) => {
          if(result) {
            return res.status(201).json({
              msg:'Register Success.',
              token:token,
              docs: {
                _id: result._id,
                name: result.name,
                email: result.email
              }
            })
          }
        })
        .catch(e => {
          res.status(500).json({
            msg:e.message
          })
        }) 
      })
    })
  })
  .catch(e => {
    res.status(500).json({
      msg:e.message
    })
  }) 
})


//  2. Login Route.

router.post('/login', (req, res, next) => {
  UserModel.find({
    email: req.body.email
  })
  .then((result) => {
    if(result.length < 1) {
      return res.status(409).json({
        msg:'Email Not Exist.'
      })
    }
    bcrypt.compare(req.body.password, result[0].password, (error, data) => {
      if(error) {
        return res.status(500).json({
          error: error.message
        })
      }
      if(data) {
        const payload = {
          _id: result[0]._id,
          name: result[0].name,
          email: result[0].email
        }
        const token = jwt.sign(payload,process.env.PRIVATE_KEY,{expiresIn:'1h'})
          if(token) {
            return res.status(200).json({
              msg:'Login success.',
              token:token,
              docs: {
                _id: result[0]._id,
                name: result[0].name,
                email: result[0].email
              }
            })
          }
      }
      res.status(404).json({
        msg:'Password Not Match.'
      })
    })
  })
  .catch((error) => {
    res.status(500).json({
      error: error.message
    })
  })
})

// All Details Route.

router.get('/', checkAuth, (req, res, next) => {
  UserModel
  .find({_id: req.user._id})
  .then((result) => {
    if(result) {
      return res.status(200).json({
        msg: 'All Fetched.',
        docs: {
          _id: result[0]._id,
          name:result[0].name,
          gender:result[0].gender,
          email:result[0].email,
          phone:result[0].phone,
        }
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      msg: err.message
    })
  }) 
})



module.exports = router;