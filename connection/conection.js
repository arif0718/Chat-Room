const mongoose =require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/ChatApp").then(()=>{
    console.log("You are connected to database");
}).catch((err)=>{
    console.log(err);
})