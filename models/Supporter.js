var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Supporter = new Schema(
  {
    Id: String,
    Firstname: String,
    Lastname: String,
    Avatar: String,
    Whishlist: [],
    Date_birth: String,
    Address: String,
    Phone: String,
    Team:String,
    Bottles:Number,
    Score: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("supporter",Supporter);