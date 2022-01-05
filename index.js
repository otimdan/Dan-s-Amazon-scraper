const express = require('express');
const app = express(); 

const dotenv = require('dotenv');
dotenv.config();

const request = require('request-promise'); 
const PORT = process.env.PORT || 5000; 


const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());



app.get('/', (req, res) => {
    res.send("Welcome to Amazon Scraper API.");
}); 

//Route1: GET product details

app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error);
    }

});

//Route2: GET product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;
    
    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/dp/${productId}`);

        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error);
    }
    
})

//Route3: GET product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;
    
    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/dp/${productId}`);

        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error);
    }
    
})

//Route3: GET search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery} = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error);
    }
    
})



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



//BELOW IS DOCUMENTATION FROM SCRAPER API WEBSITE 
// const request = require('request-promise');
  
//   request('http://api.scraperapi.com/?api_key=APIKEY&url=http://httpbin.org/ip')
//     .then(response => {
//         console.log(response)
//     })
//     .catch(error => {
//         console.log(error)
//     })