var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ResetCode = new Schema({
    Id: String,
    Email: String,
    Code:String
});


module.exports = mongoose.model("resetCode", ResetCode);