var mongoose=require("mongoose");

var scoreSchema = new mongoose.Schema({
    student_name:{ type: String},
    email: { type: String},
    quiz_id: { type: String},
    score: { type: String},
    
});
var score = mongoose.model("score",scoreSchema);
module.exports=score;