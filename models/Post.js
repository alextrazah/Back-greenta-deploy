var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Post = new Schema(
  {
    Id: String,
    Title: String,
    Content: String,
    Picture: String,
    Team : String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", Post);