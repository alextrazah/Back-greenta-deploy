var express = require('express');
var router = express.Router();
var Collect = require('../models/Collect_center');
var User = require('../models/User');

// Get all collect centers
router.get("/", function (req, res, next) {
    Collect.find(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

// Get collect center by ID
router.get('/:id',async (req, res) =>  {
  const myagents = await Collect.findById(req.params.id).populate("Trashs").populate("Collectors");
  res.send([myagents]);
  });

// Modify collect center
router.put('/:id', function(req, res, next) {
    Collect.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ msg: 'Collect center modified' }))
    .catch(err => res.status(400).json({ error: err }))
})

//Delete collect center 
router.delete('/:id',function(req, res, next) {
    Collect.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `Collect center with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
})

router.post("/addtrash/:id", async (req, res) => {
  try {
    const Collects = await Collect.findByIdAndUpdate(
      req.params.id,
      { $push: { Trashs: req.body.trash } },
      { new: true }
    );
    res.json(Collects);
  } catch (err) {   
    console.log(err);
    res.status(500).json({ message: "internal server err" });
  }
});
module.exports = router;