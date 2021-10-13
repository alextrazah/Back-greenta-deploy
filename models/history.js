var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var History = new Schema(
  {
    Id: String,
    Bottles: String,
    Score: String,
    Place: String,
    Supp: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", History);