const express = require('express');
const port = 8086;
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../database/db');
const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));

//routes
app.get('/api/features_benefits/:id/features', (req, res) => {
  let { id } = req.params;
  db.getFeatures(id)
    .then(results => {
      let { description } = results[0];
      res.send(description);
    })
    .catch(err => res.send(err));
});

app.get('/api/features_benefits/:id/benefits', (req, res) => {
  let { id } = req.params;
  db.getBenefits(id)
    .then(results => {
      let benefits = results.reduce((acc, { description }) => { return [...acc, description]; }, []);
      res.send(benefits);
    })
    .catch(err => res.send(err));
});

app.get('/api/features_benefits/:id/product_details', (req, res) => {
  let { id } = req.params;
  db.getProductDetails(id)
    .then(results => {
      let productDetails = results.reduce((acc, { detail, description }) => { return [...acc, [detail, description]]; }, []);
      res.send(productDetails);
    })
    .catch(err => res.send(err));
});

//start server
app.listen( port, () => {
  console.log(`the cats are listening on port ${port}...`);
});
