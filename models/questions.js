var mongoose=require("mongoose");

var quizSchema = new mongoose.Schema({
    question:{ type: String},
    op1: { type: String},
    op2: { type: String},
    op3: { type: String},
    op4: { type: String},
    op: { type: Number},
    email:{type: String},
});
var quiz_question = mongoose.model("quiz_question",quizSchema);
module.exports=quiz_question;