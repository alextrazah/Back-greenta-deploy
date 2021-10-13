var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
const { cloudinary } = require('../utils/cloudinary');

// Get all Products
router.get("/", function (req, res, next) {
    Product.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get Product by ID
router.get('/:id', function(req, res, next) {
    Product.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

//Add Product 
router.post('/', async function(req,res,next){
    const ProductObject = JSON.parse(JSON.stringify(req.body))
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
    const product = new Product({
        ...ProductObject,
        Picture : Picture
    }); 

      product.save()
      .then(() => res.status(200).json({ msg: 'Product enregistré ! ' }))
        .catch(err => res.status(400).json({ error: err }))
  });

// Modify Product
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

    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id, Picture: Picture })
    .then(() => res.status(200).json({ msg: 'Product modified' }))
    .catch(err => res.status(400).json({ error: err }))
})

//Delete Product  
router.delete('/:id',function(req, res, next) {
    Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `Product with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
