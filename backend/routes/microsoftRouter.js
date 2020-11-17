const express= require("express")
const Router= express.Router();

const scraper=require("../scrappers/microsoft_scraper/finalScraper")

scraper();
