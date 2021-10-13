var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
const { cloudinary } = require('../utils/cloudinary');

// Get all Posts
router.get("/", function (req, res, next) {
    Post.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get Post by ID
router.get('/:id', function(req, res, next) {
    Post.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

//Add Post 
router.post('/', async function(req,res,next){
    const PostObject = JSON.parse(JSON.stringify(req.body))
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
    const post = new Post({
        ...PostObject,
        Picture : Picture
    }); 

      post.save()
      .then(() => res.status(200).json({ msg: 'Post enregistré ! ' }))
        .catch(err => res.status(400).json({ error: err }))
  });

// Modify Post
router.put('/:id', async function(req, res, next) {
  var Picture = "http://res.cloudinary.com/dkqbdhbrp/image/upload/v1629639337/teams/p0w14tfpxonfmbrjfnnj.jpg"//a logo default
  try {
      const fileStr = req.body.Picture
       await cloudinary.uploader.upload(fileStr,{
          upload_preset : 'collectors'
      }).then((res)=>{
          Picture = res.url
          console.log("photo added")
         
      })
  } catch (error) {
      console.log(error)
  }
    Post.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id, Picture : Picture })
    .then(() => res.status(200).json({ msg: 'Post modified' }))
    .catch(err => res.status(400).json({ error: err }))
})

//Delete Post  
router.delete('/:id',function(req, res, next) {
    Post.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `Post with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
