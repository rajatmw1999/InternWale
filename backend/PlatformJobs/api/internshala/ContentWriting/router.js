const mongoose=require('mongoose');
const express= require('express');
const router= express.Router();

const jobData=require("../../../models/InternshalaIntern");

router.get('/internshala/contentwriting',async(req,res)=>{
    jobData.find({UID:"internshala_content_contentWriting"},async(err,found)=>{
        if(err){
            return res.status(500).json({
                status: 500,
                message: err,
            })
        }
        else{
            if(found.length){
                return res.status(200).json({
                    status: 200,
                    message: found,
                })
            }
            else{
                return res.status(404).json({
                    status: 404,
                    message: "No internships found"
                })
            }
        }
    })
})

module.exports=router;