const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you get a list of all the records.
recordRoutes.route('/tablist').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('tabs')
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

recordRoutes.route('/pagelist').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('pages')
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

recordRoutes.route('/pagelist/:page').get((req, res) => {
  const dbConnect = dbo.getDb();
  const listingQuery = {path : {$regex : req.params.page}};

  dbConnect
    .collection('pages')
    .find(listingQuery).toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

recordRoutes.route('/subpagelist/:subpage').get((req, res) => {
  const dbConnect = dbo.getDb();
  const listingQuery = {path : {$regex : req.params.subpage}};

  dbConnect
    .collection('subpages')
    .find(listingQuery).toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

module.exports = recordRoutes;
