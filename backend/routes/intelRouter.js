const express= require("express")
const Router= express.Router();

const scraper=require("../scrappers/intel_scraper/scraper.js")

scraper();
