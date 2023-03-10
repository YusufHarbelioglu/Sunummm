const mongoo = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId;
const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1:27017/DataBase";
let express = require("express")
let app = express()


mongoose.connect('mongodb://127.0.0.1:27017/DataBase')
    .then(res => {
        // console.log(res)
    })
    .catch(err => {
        console.log(err);
    })
mongoose.Promise = global.Promise;
const userSchema = new mongoose.Schema({
    id: Number,
    username: String,
    name: String,
    email: String,
    password: String
});
const User = mongoose.model("user", userSchema);
app.use(express.json())

app.get("/login", async (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/login", (req, res) => {
    User.findOne(req.body)
        .then(response => {
            if (response) res.send(true)
            else res.send(false)
        })
        .catch(err => console.log(err))
})

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html")
})

app.post("/register", (req, res) => {
    const myData = new User(req.body);
    app.use
    myData.save()
    res.send(true)
})

app.get("/delete", (req, res) => {
    res.sendFile(__dirname + "/delete.html")
})

app.post("/delete", (req, res) => {
    User.findOne({
        username: req.body.username,
        password: req.body.password
    })
        .then(response => {
            if (response) {
                User.findByIdAndDelete(response._id)
                    .then(check => {
                        if (check) res.send("kullanici başariyla silindi")
                        else res.send("kullanici silinemedi")
                    })
                    .catch(err => {
                        if (err) console.log(err);
                    })
            }
            else {
                res.send("kullanici bulunamadi")
            }
        })
})

app.get("/update", (req, res) => {
    res.sendFile(__dirname + "/update.html")
})

app.post("/update", (req, res) => {
    User.findOne({
        username: req.body.username,
        password: req.body.password
    })
        .then(response => {
            res.send(response);
        })
})

app.post("/updatee", (req, res) => {
    User.updateOne({ _id: req.body.id }, {
        username: req.body.username,
        password:req.body.password,
        email:req.body.email,
        name:req.body.name
      })
      .then(response=>console.log(response))
})
app.listen(8080)