var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//const Center = require("./Collect_center")


var Trash_Bin = new Schema(
  {
    Id: String,
    State: { type: Schema.Types.ObjectId, ref: 'Collect_center' },
    Bottles:Number,
    Status:String,
    Location: String,
    Lng:String,
    Lat:String,

  },
  { timestamps: true }
);

module.exports = mongoose.model("Trash_Bin", Trash_Bin);