var express = require('express');
var router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');

const db = [
  {
  name:"Arun",
  password:"123456"
  }
]

router.post('/generate', function(req, res, next) {
  try{
    const data = req.body;
    const{name,password} = data;
    const user = db.find(id => id.name == name && id.password == password);

    if(user){
      const jwttoken = jwt.sign(data,process.env.SECRET_KEY,{expiresIn:"1h"});
      console.log(jwttoken);
      return res.status(200).json({message:"Success","token":jwttoken});
    }
    return res.status(401).json({message:"Invalid Credentials"});

  }
  catch(err){
    console.log("Error Occured "+err);
  }
});

router.get('/verify',function(req,res){
  const token = req.headers['authorization'];
  if(!token){
    return res.status(403).json({message:"Token Required"});
  }
  jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
    if(err){
      return res.status(401).json({message:"Invalid Token"});
    }
    res.status(200).json({message:"Verified Successfully"});
  })
});

module.exports = router;
