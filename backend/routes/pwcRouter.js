const express= require("express")
const Router= express.Router();

const scraper=require("../scrappers/pwc_Scraper/scraper.js")

scraper();
