const mongoose=require('mongoose')
const validator =require('validator')

const cardetailschema=new mongoose.Schema({
    carname:{
        required:true,
        type:String
    },
    carimage:{
        type:Buffer,
        required:true
    },
    carpickupaddress:{
        type:String,
        required:String
    },
    cardropaddress:{
        required:true,
        type:String
    },
    city:{
        required:true,
        type:String
    },
    cartype:{
        required:true,
        type:String
    },
    fueltype:{
        type:String,
        required:true
    },
    transmissiontype:{
        type:String,
        required:true
    },
    baggage:{
        type:Number,
        required:true
    },
    seater:{
        type:Number,
        required:true
    },
    carrent:{
       type:Number,
       required:true
    },
    carplateno:{
        type:String,
        required:true,
        unique:true,
        uppercase:true
    }
 
})

const Cardetail=mongoose.model('Cardetail',cardetailschema)

module.exports= Cardetail