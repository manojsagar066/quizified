var mongoose=require("mongoose");

var creatorSchema = new mongoose.Schema({
    mail:{ type: String, index: { unique: true } },
    name:{type:String},
    num:{type:Number},
    title: String,
    
});
var creator = mongoose.model("creator",creatorSchema);
module.exports=creator;