const { Client } = require('podcast-api');

//
// If apiKey is null, then we will connect to a mock server
// that returns fake data for testing purposes.
//
// To get an apiKey to fetch real data, please visit:
//     https://www.listennotes.com/api/pricing/
//
const client = Client({ apiKey: null });

client.search({
  q: 'star wars',
  sort_by_date: 0,
  type: 'episode',
  genre_ids: '68,82',
  only_in: 'title,description',
  language: 'English',
}).then((response) => {
  // Get response json data here
  console.log(response.data);
}).catch((error) => {
  console.log(error)
});

// Click "▶ run" to try this code live.