const express= require("express")
const Router= express.Router();

const scraper=require("../scrappers/google_scraper/scraper.js")

scraper();
