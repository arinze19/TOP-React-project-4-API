const axios = require('axios');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const shortId = require('shortid');

const Product = require("../models/Product");

// Constants - pointing to local database storage for example purposes
const MONGO_URL = 'mongodb://localhost:27017/products'
const CSV_URL = 'https://example.com/products.csv'


// MongoDB Connection
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// Remote CSV File URL (Change this to your actual CSV file URL)

// Download CSV and Parse
async function fetchAndStoreCSV() {
    try {
        const response = await axios({ url: CSV_URL, responseType: 'stream' });

        const results = [];

        response.data
            .pipe(csv())
            .on('data', (row) => {
                /**
                 * For each row in the CSV file, create a new product object
                 * and push it to the results array
                 */
                const product = {
                    _id: shortId.generate(),
                    name: row.name,
                    price: parseFloat(row.price) || 0, // Convert price to number
                    description: row.description,
                    availableSizes: row.sizes ? row.sizes.split(',').map(Number) : [],
                    imagesUrl: [{ type: 'image', url: row.image }],
                    comments: [],
                };
                results.push(product);
            })
            .on('end', async () => {
                /**
                 * Insert all products into the database
                 */
                await Product.insertMany(results);
                mongoose.connection.close();
            });
    } catch (error) {
        console.error('Error fetching CSV:', error);
    }
}

// Run script
fetchAndStoreCSV();
