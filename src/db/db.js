const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connect to DB");
    })
}

module.exports = connectToDB