const axios = require('axios'); // Importing axios for making HTTP requests
const cheerio = require('cheerio'); // Importing cheerio for parsing HTML
const express = require('express');

const app = express();
const PORT = 3000;

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

app.get("/images", async (req, res) => {
    const images = await getImages("https://Google.co.uk")
    res.send(`
        <h1>Images Found</h1>
        <div>
            ${images.map(img => `<img src="${img}" style="width: 200px; margin: 10px;" />`).join('')}
        </div>
    `); 
});

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:${PORT}")
})
