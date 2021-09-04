const express  = require('express')
const path = require('path');
const app = express()
const mongoose  = require("mongoose");
const creator = require("./models/creator")
const quiz_question = require("./models/questions")
const MongoClient = require('mongodb').MongoClient;
const score = require('./models/score')
const port = 8080

const uri = "give your mongodb uri to connect to the database";   //your mongodb uri
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("db open");
}).catch((err)=>{
    console.log(err);
});
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.render('index');
})

app.post("/quizComplete",async(req,res)=>{
    var student_name, quiz_id, email,score1;
    student_name = req.body.student_name;
    quiz_id = req.body.quiz_id;
    email = req.body.email;
    score1 = req.body.score;

    const user = await score.create({student_name:student_name,email:email,quiz_id,score:score1});
    res.render('index');

});

app.post('/result',async(req,res)=>{
    var quiz_id;
    quiz_id = req.body.quiz_id;
    const doc = await score.find({quiz_id:quiz_id});
    console.log(doc)
    res.render('result',{doc:doc})
});

app.post("/attend",async(req,res)=>{
    var student_name, email, quiz_id;
    student_name = req.body.student_name;
    email = req.body.email;
    quiz_id = req.body.quiz_id;

    const doc = await quiz_question.find({email:quiz_id});
    
    res.render('attend',{student_name:student_name, email:email, quiz_id:quiz_id, doc:doc});
});



app.post("/create",async(req,res)=>{
    count = 1;
    var name, email, num,title;
    name = req.body.name;
    email = req.body.email;
    num = req.body.num;
    title = req.body.title;
    const user = await creator.create({mail:email, name:name,num:num,title:title});
    res.render('createquiz',{email:email,count:count});
});

app.post("/createquestion",async(req,res)=>{
    count+=1;
    email = req.body.email;
    var question, op1, op2, op3, op4, op;
    question = req.body.question;
    op1 = req.body.op1;
    op2 = req.body.op2;
    op3 = req.body.op3;
    op4 = req.body.op4;
    op = req.body.c_op
    const user = await quiz_question.create({email:email,question:question, op1:op1, op2:op2, op3:op3, op4:op4, op:op});
    
    const doc = await creator.findOne({mail:email});
    if (count>doc.num){
        res.render('index');
    }
    else{
    res.render('createquiz',{email:email,count:count});
    }
});


app.listen(port, ()=>{
    console.log(`app listening at http://localhost:${port}`)
})
