var express = require('express');
var router = express.Router();
var Collector = require('../models/Collector');
var Center = require('../models/Collect_center');
var User = require('../models/User');

const { cloudinary } = require("../utils/cloudinary");
var bcrypt = require("bcrypt");

// Get all Collectors
router.get("/", function (req, res, next) {
    Collector.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get Collector by ID
router.post('/:id', function(req, res, next) {
    Collector.findById(req.params.id,function(err,data){
      try {
        if(data)
        res.send(true);
        else res.send(false);
      } catch (error) {
        res.send(error);
      }
    })
  });

//add collector from center
router.post("/addCollector/:id", async function (req, res, next) {
  const obj = JSON.parse(JSON.stringify(req.body));

  var Avatar =
    "http://res.cloudinary.com/dkqbdhbrp/image/upload/v1629639337/teams/p0w14tfpxonfmbrjfnnj.jpg"; //a logo default


  const hashedPassword = await bcrypt.hash(obj.Password, 10);
  const collector = {
    Name: obj.Name,
    QrCode: obj.QrCode,
    Center: req.params.id,
    Phone: obj.Phone,
    Address: obj.Address,
    Date_birth: obj.Date_birth,
    Bottels:0,
    Avatar: Avatar,
  };
  var ids;


  const mynew = await Collector.create(collector).then((d) => {
    (ids = d._id), console.log(ids);
    User.create({
      _id: d._id,
      Password: hashedPassword,
      Email: obj.Email,
      Role: "Collector",
      Active: 1,
    });
  });


  try {
    const addnew = await Center.findByIdAndUpdate(
      req.params.id,
      { $push: { Collectors: ids } },
      { new: true }
    );
    res.json(addnew);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server err" });
  }

  res.send(addnew);
});

// Modify Collector
router.put('/:id', function(req, res, next) {
    Collector.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ msg: 'Collector modified' }))
    .catch(err => res.status(400).json({ error: err }))
})

//Delete Collector 
router.delete('/:id',function(req, res, next) {
    Collector.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `Collector with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
})
module.exports = router;