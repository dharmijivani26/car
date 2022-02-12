const express=require('express')
const router=new express.Router()
const jwt=require('jsonwebtoken')
const {User}=require('../model/user')
const {authuser}=require('../middleware/auth')
const Userdetail=require('../model/userdetail')
// const fs=require('fs')


router.post('/register',async(req,res)=>{
    const user=new User(req.body)
    if(!req.body.confirmpassword){
        return res.json({message:'Enter confirmpassword value'})
    }
    if(req.body.confirmpassword!==req.body.password){
        return res.json({message:'Password does not match'})
    }
    try{
        await user.save()
        await sendwelcomeemail(user.email,user.firstname)
        const token=await user.generateAuthToken()
        res.status(201).json({user,token})
    }catch(e){
        res.status(400).json({error:e})
    } 
})



router.post('/login',async(req,res)=>{

    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.status(200).json({user,token})
    }catch(e){
        console.log(e)
        res.status(400).json({error:"Email and password does not match!"})
    }
})


router.get('/user',async(req,res)=>{

    try{
        const limit=parseInt(req.query.limit)
        const page=parseInt(req.query.page-1)||0
        const user=await User.find({}).sort({createdAt:-1}).skip(page*limit).limit(limit)
    
        res.status(200).json({user})
    }catch(e){
        res.status(400).json({error:e})
    }
})



router.post('/adduserdetail',authuser,async(req,res)=>{
    const user=await new Userdetail({
        ...req.body,
        owner:req.user._id
    })
    if(req.body.phnno.length!==10){
        return res.json({error:'phnno is invalid!'})
    }
    if(!req.body.pincode.match(/^[1-9][0-9]{5}$/)){
        return res.status(400).json({error:'pincode is invalid!'})
    }
    if(!req.body.panno.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)){
        return res.status(400).json({error:'panno is invalid!'})
    }
    try{
        await user.save()
        res.status(201).json({user})
    }catch(e){
        res.status(400).json({error:e})
    }
})

router.get('/userdetail',async(req,res)=>{
    try{
        const limit=parseInt(req.query.limit)
        const page=parseInt(req.query.page-1)||0
        const user=await Userdetail.find({}).sort({createdAt:-1}).skip(page*limit).limit(limit)
    
        res.status(200).json({user})
    }catch(e){
        res.status(400).json({error:e})
    }
})

router.patch('/updateuserprofile',authuser,async(req,res)=>{

    const updates=Object.keys(req.body)
    const allowedtasks=['firstname','lastname','password']
    const validoperations=updates.every((update)=>allowedtasks.includes(update))

    if(!validoperations){
        res.json({error:"invalid updates"})
    }
    try{    
        // const user=await User.findByCredentials(req.body.email,req.body.password)
 
        const user =await User.findOne({email:req.user.email}) 
    
        
        updates.forEach((update)=>user[update]=req.body[update])

        await user.save()   
        res.status(200).json({user})
        res.send(req.user)

    }catch(e){
        console.log(e)
        res.status(400).json({error:"profile is not update"})
    }
})

router.patch('/resetuserpassword',authuser,async(req,res) =>{
    if(!req.body.password || req.body.password.length<6) {
        return res.status(404).json({error:"password is not entered!"})
    }
    if(!req.body.password || req.body.confirmpassword){
        return res.status(404).json({error:"please valid confirmpassword!"})
    }
    if(!req.body.confirmpassword || req.body.password){
        return res.status(404).json({error:"password is not match"})
    }
    try{
        const user = await User.findOne({email:req.body.email})
        user.password = req.body.password
        await user.save()
        res.status(200).json({message:"password has been changed!"})
    }catch (e) {
        res.status(400).json({error:e})
    }
})




module.exports=router