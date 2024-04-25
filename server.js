const express = require('express')
const app = express()
const http = require('http').createServer(app)


const PORT = process.env.PORT || 3000

const path = require('path');
require("./connection/conection")
const Signupregister = require("./model/signupModel");


const pathPublic = path.join(__dirname,"/public");


app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(express.static(pathPublic));

app.set("view engine", "hbs");

app.get("/", (req,res)=> {
    res.render("index");
})

app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.post("/signup", async(req,res)=>{
    try{
        const Datastore = new Signupregister({
            username : req.body.username,
            password : req.body.password,
            comformpassword : req.body.conformpassword
        });

        const data = await Datastore.save();
        res.render("signin")
    }catch(err){
        console.log(err);
    }
});

app.get("/signin",(req,res)=>{
    res.render("signin");
})

app.post("/signin",async(req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const Storage = await Signupregister.findOne({username : username});
        if(Storage.password === password){
            res.render("index");
        }else{
            res.send("Invalid login Details!");
        }
    }catch(err){
        res.send("Invalid LoginId");
    }
});

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
     
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})

