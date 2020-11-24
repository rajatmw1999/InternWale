const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const JobData = require('../models/Job');
const InternData = require('../models/InternFullTime');
const CategoryData = require('../models/CategoryJob');
const { route } = require('./email');


//RETURN ALL JOBS STORED IN DB AT ONCE
router.get('/all', async(req, res)=>{
    JobData.find({}, async(err, found)=>{
        if(err)
            return res.status(500).json({
                status:500,
                message:err
            });
        else
        {
            if(found.length){
                return res.status(200).json({
                    status:200,
                    message:found
                });
            }
            else{
                return res.status(404).json({
                    status:404,
                    message:"No jobs were found."
                });
            }
        }
    });
});

//TO GET ALL JOBS OF A PARTICULAR COMPANY
router.get('/company/:CompanyName', async(req, res)=>{
    const CompanyName = req.params.CompanyName;

    JobData.find({CompanyName:CompanyName}, async(err, found)=>{
        if(err)
            return res.status(500).json({
                status:500,
                message:err
            });
        else
        {
            if(found.length){
                return res.status(200).json({
                    status:200,
                    message:found
                });
            }
            else{
                return res.status(404).json({
                    status:404,
                    message:"No jobs were found."
                });
            }
        }
    });
});

//TO AUTOMATICALLY SORT DATA ACCORDING TO INTERN OR FULL TIME FOR FASTER DB QUERIES
router.get('/sort/intern/full', async(req, res)=>{
    JobData.find({}, async(err, found)=>{
        if(err)
            return res.status(500).json({
                status:500,
                message:err
            });
        else
        {
            if(found.length){
                let finalData = [];
                let finalFullTime = [];
                await found.forEach(async(record) => {
                    finalData = [];
                    finalFullTime = [];
                    await record.Data.forEach(async(jobArray) => {
                        if((jobArray.Title.includes('Intern'))||(jobArray.Title.includes('Internship'))||(jobArray.Title.includes('Internships')))
                            finalData.push(jobArray);
                        else
                            finalFullTime.push(jobArray);
                    });
                    if(finalData.length)
                    {
                        const newIntern = new InternData({
                            CompanyName:record.CompanyName,
                            DateScrap:Date.now(),
                            UID:record.UID,
                            Data:finalData,
                            Type:"Intern"
                        });
                        const newIntern2 = new InternData({
                            CompanyName:record.CompanyName,
                            DateScrap:Date.now(),
                            UID:record.UID,
                            Data:finalFullTime,
                            Type:"Full Time"
                        }); 
                        await newIntern.save();
                        await newIntern2.save();

                        console.log(newIntern);
                        console.log("---------------------------------------------------------");
                        console.log(newIntern2);

                    }
                });
                return "Data Saved";
            }
            else{
                return res.status(404).json({
                    status:404,
                    message:"No jobs were found."
                });
            }
        }
    });
});

//RETURN ALL INTERNSHIPS FROM 'INTERNFULLTIME' MONGODB MODEL
router.get('/type/intern', async(req, res)=>{
    InternData.find({Type:"Intern"}, async(err, found)=>{
        if(err)
            return res.status(500).json({
                status:500,
                message:err
            });
        else
        {
            if(found.length){
                return res.status(200).json({
                    status:200,
                    message:found
                });
            }
            else{
                return res.status(404).json({
                    status:404,
                    message:"No internships were found."
                });
            }
        }
    });
});

//RETURN ALL FULLTIME FROM 'INTERNFULLTIME' MONGODB MODEL
router.get('/type/fulltime', async(req, res)=>{
    InternData.find({Type:"Full Time"}, async(err, found)=>{
        if(err)
            return res.status(500).json({
                status:500,
                message:err
            });
        else
        {
            if(found.length){
                return res.status(200).json({
                    status:200,
                    message:found
                });
            }
            else{
                return res.status(404).json({
                    status:404,
                    message:"No full time jobs were found."
                });
            }
        }
    });
});

//SORT ALL JOBS ACCORDING TO CATEGORY(ENGINEERING, SERVICES, MARKETING) AND STORE IN A NEW MODEL 'CATEGORYJOB' FOR FASTER DB QUERY
router.get('/sort/category', async(req, res) => {

    let categories = ['Engineering','Marketing','Business'];

    JobData.find({}, async(err, found)=>{
        if(err)
            return res.status(500).json({
                status:500,
                message:err
            });
        else
        {
            if(found.length){
                let finalData = [];
                await categories.forEach(async(category)=>{
                finalData = [];
                await found.forEach(async(record) => {
                    await record.Data.forEach(async(jobArray) => {
                        if(jobArray.Category.includes(category))
                            finalData.push(jobArray);
                    });
                });
                if(finalData.length)
                    {
                        const newCategory = new CategoryData({
                            Data:finalData,
                            Category:category
                        });
                        await newCategory.save();
                        console.log(newCategory);
                    }
            });
                return "Data Saved";
            }
            else{
                return res.status(404).json({
                    status:404,
                    message:"No jobs were found."
                });
            }
        }
    });
});

//RETURN ALL PARTICULAR CATEGORY JOBS FROM 'CATEGORYJOB' MONGODB MODEL
router.get('/category/:Category', async(req, res)=>{
    const Category = req.params.Category;
    CategoryData.find({Category:Category}, async(err, found)=>{
        if(err)
            return res.status(500).json({
                status:500,
                message:err
            });
        else
        {
            if(found.length){
                return res.status(200).json({
                    status:200,
                    message:found
                });
            }
            else{
                return res.status(404).json({
                    status:404,
                    message:"No jobs were found for the category = " + Category
                });
            }
        }
    });
});

//GET ALL JOBS WITHIN THE LAST 10 DAYS (1000000000) = VALUE OF TIMESTAMP
router.get('/time/1week', async(req, res)=>{
    JobData.find({}, async(err, found)=>{
        if(err)
            return res.status(500).json({
                status:500,
                message:err
            });
        else
        {
            if(found.length){
                let Data = [];
                let finalData = [];
                await found.forEach(async(job)=>{
                    if((Date.now() - job.DateScrap) < 1000000000 )
                        Data.push(job);
                });
                await Data.forEach(async(data) => {
                    finalData.push(data.Data);
                });
                return res.status(200).json({
                    status:200,
                    message:finalData
                });
            }
            else{
                return res.status(404).json({
                    status:404,
                    message:"No jobs were found."
                });
            }
        }
    });
});

// DELETE JOBS OF OVER 2MONTH AGO, TIME STAMP OF DIFFERENCE = 6000000000
router.get('/delete/2month', async(req, res)=>{
    const criteria = Date.now() - 6000000000;
    JobData.deleteMany({DateScrap:{ $gt: criteria }}, async(err, found)=>{
        if(err)
            return res.status(500).json({
                status:500,
                message:err
            });
        else
        {
            if(found.length){
                return res.status(200).json({
                    status:200,
                    message:"Deleted jobs of over 1month ago."
                });
            }
            else{
                return res.status(404).json({
                    status:404,
                    message:"No jobs were found."
                });
            }
        }
    });
});

module.exports = router;