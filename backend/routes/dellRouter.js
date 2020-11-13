const express= require("express")
const Router= express.Router();

const scraper=require("../scrappers/dell_scraper/scraper.js")

scraper();
