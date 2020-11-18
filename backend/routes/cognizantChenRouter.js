const express= require("express")
const Router= express.Router();

const scraper=require("../scrappers/cognizant_Chennai_scraper/scraper.js")

scraper();
