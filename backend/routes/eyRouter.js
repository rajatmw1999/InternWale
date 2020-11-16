const express= require("express")
const Router= express.Router();

const scraper=require("../scrappers/ey_scraper/scraper.js")

scraper();
