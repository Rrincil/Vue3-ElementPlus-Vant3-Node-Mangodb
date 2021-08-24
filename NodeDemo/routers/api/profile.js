//login@regist
const express = require('express');
const router = express.Router()
const profile = require('../../models/profile')


const passport = require('passport');

const { session } = require('passport');

//@router get api/profile/text
//@desc 返回的请求的json数据
//@access public
router.get('/text',(req,res)=>{
  res.json({mes:'text'})
})


//@router podt api/profile/add
//@desc 存入json数据
//@access private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
  const newprofile ={}

  if(req.body.name) newprofile.name = req.body.name;
  if(req.body.num) newprofile.num = req.body.num;  
  if(req.body.url) newprofile.url = req.body.url;  
  if(req.body.shopname) newprofile.shopname = req.body.shopname;

  new profile(newprofile).save().then(profile=>{
    res.json(profile)
  })
})








//@router get api/profile/getallmes
//@desc 获取所有的json数据
//@access private
router.get("/getallmes",passport.authenticate("jwt",{session:false}),(req,res)=>{
  profile.find().then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router get api/profile/:id
//@desc 获取单个json数据
//@access private
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  profile.findOne({_id:req.params.id}).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router podt api/profile/edit
//@desc 编辑json数据
//@access private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  const newprofile ={}

  if(req.body.name) newprofile.name = req.body.name;
  if(req.body.num) newprofile.num = req.body.num;    
  if(req.body.url) newprofile.url = req.body.url;  
  if(req.body.shopname) newprofile.shopname = req.body.shopname;

  profile.findByIdAndUpdate(
    {_id:req.params.id},
    {$set:profile},
    {new:true}
  ).then(profile=>{
    res.json(profile)
  })
})


//@router post api/profile/delete/:id
//@desc 删除json数据
//@access private
router.delete("/deldete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  profile.findOneAndRemove({_id:req.params.id}).then(mes=>{
    if (mes) {
      mes.save().then(profile=>res.json(profile))
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})
module.exports = router
