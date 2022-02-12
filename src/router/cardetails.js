const express=require('express')
const router=new express.Router()
const multer=require('multer')
const sharp=require('sharp')
const jwt=require('jsonwebtoken')
const  Cardetail = require('../model/car')
const {authuser}=require('../middleware/auth')



const upload=multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)){
            return cb(new Error('Please upload jpg,jpeg,png or pdf file!'))
        }
        cb(undefined,true)
    }
})

router.post('/cardetails',authuser,upload.fields([{name:'carimage'}]),async(req,res) => {
    const car = new Cardetail({
        ...req.body,
        carimage:Buffer.from(req.files.carimage[0].buffer).toString('base64')

    })

    if(!req.body.fueltype == 'petrol' || !req.body.fueltype == 'diesel' || !req.body.fueltype == 'cng') {
        return res.status(400).json({error:'please valid fueltype'})
  }
  
    try{
        await car.save()
        res.status(200).json({message:"car is added successfully"})
    }catch (e) {
        res.status(404).json({error:e})
    }
})



module.exports = router