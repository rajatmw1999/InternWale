const express= require("express")
const Router= express.Router();

const scraper=require("../scrappers/kpmg_scraper/scraper.js")

scraper();
