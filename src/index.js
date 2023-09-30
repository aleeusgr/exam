require('dotenv').config();
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const app = express();

const cache = new NodeCache({ stdTTL: 60 * 5 }); // Cache for 5 minutes
const GNEWS_API_BASE_URL = 'https://gnews.io/api/v4';
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

app.get('/articles', async (req, res) => {
  const { count = 10, q = '' } = req.query;

  const cacheKey = `${count}-${q}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(`${GNEWS_API_BASE_URL}/search`, {
      params: { token: GNEWS_API_KEY, q, max: count },
    });

    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from GNews API' });
  }
});

app.get('/articles/title/:title', async (req, res) => {
  const { title } = req.params;

  const cacheKey = `title-${title}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(`${GNEWS_API_BASE_URL}/search`, {
      params: { token: GNEWS_API_KEY, q: title },
    });

    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from GNews API' });
  }
});

app.get('/articles/author/:author', async (req, res) => {
  const { author } = req.params;

  const cacheKey = `author-${author}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(`${GNEWS_API_BASE_URL}/search`, {
      params: { token: GNEWS_API_KEY, author },
    });

    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from GNews API' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

