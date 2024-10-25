const axios = require('axios'); // Importing axios for making HTTP requests
const cheerio = require('cheerio'); // Importing cheerio for parsing HTML
const express = require('express');

async function getImages(url) {
    try{
        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        const images = [];
        $("img").each((index, element) =>{
            const src = $(element).attr("src");
            if (src) {
                images.push(src);
            }
        });

        return images;

    } catch (error) {
        console.error("Error scraping images: ", error);
        return [];
    }
}

getImages("https://Google.co.uk").then(images => {
    console.log("Images found: ", images);  
});