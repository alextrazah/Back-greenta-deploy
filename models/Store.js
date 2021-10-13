var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Store = new Schema(
  {
    Id: String,
    Name: String,
    Location: String,
    Team: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", Store);