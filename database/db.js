var mysql = require('mysql');
var mysqlConfig = require('./config/config.js');
const Promise = require('bluebird');
var connection = mysql.createConnection(mysqlConfig);

const getFeatures = function(productID) {
  return new Promise((resolve, reject) => {
    connection.query('select description from features where productID = ?', productID, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const getBenefits = function(productID) {
  return new Promise((resolve, reject) => {
    connection.query('select description from benefits where productID = ?', productID, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const getProductDetails = function(productID) {
  return new Promise((resolve, reject) => {
    connection.query('select detail, description from product_details where productID = ?', productID, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports.getFeatures = getFeatures;
module.exports.getBenefits = getBenefits;
module.exports.getProductDetails = getProductDetails;