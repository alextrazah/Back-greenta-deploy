var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Product = require('./Product');

var Whishlist = new Schema(
  {
    Id: String,
    IdUser : String,
    Product : String,
    Etat : Number, // 0 whishlist, 1 bought
    Coupon: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Whishlist",Whishlist);