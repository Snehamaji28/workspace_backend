const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log("DB connected");
})
.catch(()=>{
    console.log("something went wrong while db connection");
});

module.exports = mongoose.connection;