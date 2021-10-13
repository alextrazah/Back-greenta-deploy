var express = require('express');
var router = express.Router();
var Team = require('../models/Team');
var User = require('../models/User');
const { cloudinary } = require('../utils/cloudinary');

// Get all teams
router.get("/", function (req, res, next) {
    Team.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get Team by ID
router.get('/:id', function(req, res, next) {
    Team.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

// Modify Team
router.put('/:id', async function (req, res, next) {

  var Logo = "http://res.cloudinary.com/dkqbdhbrp/image/upload/v1629639337/teams/p0w14tfpxonfmbrjfnnj.jpg"//a logo default
  
  try {
      const fileStr = req.body.Logo
       await cloudinary.uploader.upload(fileStr,{
          upload_preset : 'supporter'
      }).then((res)=>{
          Logo = res.url
          console.log("photo added")
      })
  } catch (error) {
      console.log(error)
  }
    Team.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id, Logo: Logo })
    .then(() => res.status(200).json({ msg: 'Supporter modified' }))
    .catch(err => res.status(400).json({ error: err }))
})

//Delete supporter 
router.delete('/:id',function(req, res, next) {
  Team.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ msg: `Team with id : ${req.params.id} has been removed` }))
  .catch(err => res.status(400).json({ error: err }))
})

module.exports = router ;



