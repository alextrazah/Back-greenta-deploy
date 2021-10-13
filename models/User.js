var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema(
  {
    Id: String,
    Password: String,
    Email: String,
    Role: String,
    Active: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", User);
