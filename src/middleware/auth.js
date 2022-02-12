const jwt=require('jsonwebtoken')
const {User}=require('../model/user')
// const {Cardetail}=require('../model/car')


const authuser=async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})

        if(!user){
            throw new Error()
        }

        req.token=token
        req.user=user
        next()
    }catch(e){
        res.status(401).json({message:"Please Authenticate."})
    }
}



// const authserviceprovider=async (req,res,next)=>{
//     try{
//         const token=req.header('Authorization').replace('Bearer ','')
//         const decoded=jwt.verify(token, process.env.JWT_SECRET)
//         const car=await Cardetail.findOne({_id:decoded._id,'tokens.token':token})

//         if(!car){
//             throw new Error()
//         }

//         req.token=token
//         req.car=car
//         next()
//     }catch(e){
//         res.status(401).json({message:"Please Authenticate."})
//     }
// }


module.exports={
    authuser
    // authserviceprovider
}