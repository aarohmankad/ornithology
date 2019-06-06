const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch');

const server = express();
const client = new Client({ node: 'http://localhost:9200' });

// Allow us to return json to client
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(bodyParser.json());

// Add headers for http requests
server.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,origin,content-type,accept'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

server.get('/', (req, res) => {
  const filters = [{ match: { text: req.query.text } }];

  if (req.query.hashtags && req.query.hashtags.length) {
    filters.push({
      match_phrase: {
        'hashtags.text': req.query.hashtags,
      },
    });
  }

  if (req.query.usernames && req.query.usernames.length) {
    filters.push({
      match_phrase: {
        user_screenname: req.query.usernames,
      },
    });
  }

  return client
    .search({
      index: 'tweets',
      explain: true,
      body: {
        query: {
          bool: {
            should: filters,
          },
        },
      },
    })
    .then(({ body }) => {
      return res.send(body.hits.hits);
    });
});

server.listen(8000);
