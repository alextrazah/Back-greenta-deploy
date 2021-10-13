var express = require('express');
var router = express.Router();
var Supporter = require('../models/Supporter');
var User = require('../models/User');
var history = require('../models/history');

const { cloudinary } = require('../utils/cloudinary');
var bcrypt = require("bcrypt");
// Get all supporters
router.get("/", function (req, res, next) {
    Supporter.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get supporter by ID
router.get('/:id', function(req, res, next) {
    Supporter.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

// Modify supporter
router.put('/test/:id', async function (req, res, next) {
  
  User.findByIdAndUpdate(req.params.id, mail, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("done");
    }
  });
})
////
router.put('/:id', async function (req, res, next) {

  var Avatar = "http://res.cloudinary.com/dkqbdhbrp/image/upload/v1629639337/teams/p0w14tfpxonfmbrjfnnj.jpg"//a logo default
  const mail = {
    Email: req.body.Email,
  };
  try {
      const fileStr = req.body.Avatar
       await cloudinary.uploader.upload(fileStr,{
          upload_preset : 'supporter'
      }).then((res)=>{
          Avatar = res.url
          console.log("photo added")
      })
  } catch (error) {
      console.log(error)
  }
    Supporter.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id, Avatar: Avatar })
    .then(User.findByIdAndUpdate(req.params.id, mail, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.send("done");
      }
    }))
    .catch(err => res.status(400).json({ error: err }))
})
router.put('/changepass/:id', async function (req, res, next) {
  const hashedPassword = await bcrypt.hash(req.body.password,10);
  const pass = {
    Password: hashedPassword,
  };
  User.findByIdAndUpdate(req.params.id, pass, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("done");
    }
  });
})

//Delete supporter 
router.delete('/:id',function(req, res, next) {
    Supporter.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `Supporter with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
  })


  
router.post("/addhistory", async function (req, res, next) {
  const obj = JSON.parse(JSON.stringify(req.body));

  const hys = {
    supp: obj.supp,
    Bottles: obj.bottles,
    
  };
  history.create(hys)
  res.send("Done");
});
module.exports = router;