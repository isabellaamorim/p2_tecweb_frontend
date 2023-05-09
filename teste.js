const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://local-business-data.p.rapidapi.com/search-in-area',
  params: {
    query: 'pizza',
    lat: '-23.5489',
    lng: '-46.6388',
    zoom: '13',
    limit: '2',
    language: 'pt',
    region: 'br'
  },
  headers: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': '4190895e44msh72ed21e2f7d0116p171637jsn12e7a2913866',
    'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
  }
};

async function getData() {
  try {
    const response = await axios.request(options);
    data = response.data;
    console.log(data.data);
  } catch (error) {
    console.error(error);
  }
}

getData();
