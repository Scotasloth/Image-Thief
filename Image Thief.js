const axios = require('axios')
const cheerio = require('cherrio')
const express = require('express')

async function getImages(url) {
    try{
        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        const images = [];

    } catch (error) {
        console.error("Error scraping images: ", error);
        return [];
    }
}

getImages("https://Google.co.uk").then(images => {
    console.log("Images found: ", images);  
});