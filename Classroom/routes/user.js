const express=require('express');
const router=express.Router();



router.get('/',(req,res)=>{
    res.send('users ones');
})

module.exports=router;