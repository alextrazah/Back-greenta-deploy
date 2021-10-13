var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Product = new Schema(
  {
    Id: String,
    Name: String,
    Picture: String,
    Team : String,
    Category : String,
    Likes : Number,
    Points_Required: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", Product);