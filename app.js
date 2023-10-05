import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://Olayemi:sinomo2006@cluster0.v0avwhv.mongodb.net/quizDB');

const saveSchema = {
    sco: Number,
    username: String
}



const Sco = mongoose.model("score", saveSchema);

// import data from './question.json' assert { type: 'json' };
// console.log(data);





app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/game", (req, res) => {
    res.render("game.ejs");
})

app.get("/end.html", (req, res) => {
    res.render("end.ejs");
});

app.get("/highscores.html", (req, res) => {
    
        Sco.find().then((found) => {
            found.sort((a, b) => {
                return b.sco - a.sco;
            });
            found.splice(7);
            res.render("highscores.ejs", {
                data: found
            });
        });
     });

app.post("/save", (req, res) => {
    const point = new Sco({
         sco: req.body.scoree,
         username: req.body.username
    });
    point.save().then(() => {
        res.redirect("/");
    })
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Port running at ${port}`);
});


