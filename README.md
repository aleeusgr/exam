# exam
Your task is to create a simple API that interacts with a public news API for fetching articles. For the back-end, you can use the language and framework of your choice. For example, you can use the GNews API and then create your own API service, with documentation, that interacts with this API for fetching articles.

## to use:

`npm install`
`echo "GNEWS_API_KEY=<api-key>" > .env`
`npm start`

send requests in browser.

## example request:
http://localhost:5000/articles?count=10&q=JWST

`count` is the number of articles to fetch.

`q` is the topic.



