const express = require('express')
const router = express.Router()
const {authuser}=require('../middleware/auth')
// const Updateuserprofile = require('../model/updateuserprofile')
const User = require('../model/user')


router.patch('/updateuserprofile',authuser,async(req,res)=>{

    const updates=Object.keys(req.body)
    const allowedtasks=['email','firstname','lastname','password']
    const validoperations=updates.every((update)=>allowedtasks.includes(update))

    if(!validoperations){
        res.json({error:"invalid updates"})
    }
    try{     
        const user =await User.findOne({email:req.user.email}) 
        
        updates.forEach((update)=>user[update]=req.body[update])

        await user.save()   
        res.status(200).json({user})
    }catch(e){
        res.status(400).json({error:e})
    }
})

// router.patch('/updateuserdetail',authuser,async(req,res) => {
//     const updates = Object.keys(req.body)
//     const allowedtasks=['city','pincode','address']
//     const validoperations=updates.every((update) => allowedtasks.includes(update))

//     if(!validoperations){
//         res.json({error:'invalid updates'})
//     }
//     try{
//         const user = await User.find({})

//         updates.forEach((update) => [update] = req.body[update])
//         await user.save()
//         res.status(200).json({user})
//     }catch (e) {
//         res.status(400).json({error:e})
//     }
// })





module.exports=router
