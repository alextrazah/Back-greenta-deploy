var express = require('express');
var router = express.Router();
var Whishlist = require('../models/Whishlist');
const { cloudinary } = require('../utils/cloudinary');

// Get all Whishlists
router.get("/", function (req, res, next) {
    Whishlist.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get Whishlist by ID
router.get('/:id', function(req, res, next) {
    Whishlist.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

//Add Whishlist 
router.post('/', async function(req,res,next){
    const WhishlistObject = JSON.parse(JSON.stringify(req.body))
    var Picture = "http://res.cloudinary.com/dkqbdhbrp/image/upload/v1629639337/teams/p0w14tfpxonfmbrjfnnj.jpg"//a logo default
    try {
        const fileStr = req.body.Picture
         await cloudinary.uploader.upload(fileStr,{
            upload_preset : 'collectors'
        }).then((res)=>{
            Picture = res.url,
            console.log("photo added")
           
        })
    } catch (error) {
        console.log(error)
    }
    const whishlist = new Whishlist({
        ...WhishlistObject,
        Picture : Picture
    }); 

      whishlist.save()
      .then(() => res.status(200).json({ msg: 'Whishlist enregistré ! ' }))
        .catch(err => res.status(400).json({ error: err }))
  });

// Modify Whishlist
router.put('/:id', async function (req, res, next) {
  if(req.body.Picture == ""){
    var Picture = "http://res.cloudinary.com/dkqbdhbrp/image/upload/v1629639337/teams/p0w14tfpxonfmbrjfnnj.jpg"
}else{
  Picture = req.body.Picture
}  
  try {
      const fileStr = req.body.Picture
       await cloudinary.uploader.upload(fileStr,{
          upload_preset : 'supporter'
      }).then((res)=>{
          Picture = res.url
          console.log("photo added")
      })
  } catch (error) {
      console.log(error)
  }

  Whishlist.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id, Picture: Picture })
    .then(() => res.status(200).json({ msg: 'Whishlist modified' }))
    .catch(err => res.status(400).json({ error: err }))
})

//Delete Whishlist  
router.delete('/:id',function(req, res, next) {
    Whishlist.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `Whishlist with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
