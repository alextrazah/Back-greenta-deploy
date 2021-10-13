var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Team = new Schema(
  {
    Id: String,
    Name: String,
    Sname: String,
    Region: String,
    Address: String,
    Logo: String,
    Phone: String,
    Score: Number,
    Active: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("teams", Team);