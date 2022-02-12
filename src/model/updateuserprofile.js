const mongoose = require('mongoose')
const validator = require('validator')

const updateuserprofileschema = new mongoose.Schema({

 firstname:{
    type:String,
    require:true,
 },

 lastname:{
    type:String,
    require:true,
 },

 gender:{
    type:String,
    require:true,
 },

 phnno:{
    type:Number,
    require:true,
    uniq:true
 },

 city:{
    type:String,
    require:true
 },

 pincode:{
    type:Number,
    require:true
 },

 address:{
    type:String,
    require:true
 }

})


const Updateuserprofile = new mongoose.model('Updateuserprofile', updateuserprofileschema)

module.exports = Updateuserprofile
