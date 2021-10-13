var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Blog = new Schema(
  {
    Id: String,
    Team: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", Blog);