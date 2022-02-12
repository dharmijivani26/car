const mongoose = require('mongoose')
const mongodb  = require('mongodb')

mongoose.connect('mongodb://127.0.0.1:27017/cab-rental',
    {
        useNewUrlParser:true

    }
).then(()=>{
    console.log("DB connected")
}).catch((e)=>{
    console.log(e)
})



    
 

