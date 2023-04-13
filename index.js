const exp=require("express");
const app=exp();
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(exp.static("public"));
app.set('view engine', 'ejs');

// mongoose.connect("mongodb://127.0.0.1:27017/myQuotesDB");

mongoose.connect("mongodb+srv://alankriti:aloo1234@cluster0.pjqj4bm.mongodb.net/myQuotesDB")

const quoteSchema = new mongoose.Schema({
    quote : String,
})

const Quotes = mongoose.model("Quote",quoteSchema);

app.get("/",function(req,res){
    Quotes.find({}).then(quote => {
        // console.log(quote)
        res.render("index",{quotes:quote});
    })
})

app.post("/",function(req,res){
    const newQuote = new Quotes({
        quote:req.body.quotes,
    })
    newQuote.save();
    // console.log(req.body.quotes);
    res.redirect("/");
})

app.listen(8080,function(){
    console.log("Running at port 8080");
})