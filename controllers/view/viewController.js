const axios = require('axios');

exports.table = async (req, res) => {
  try {
    let respose = await axios.get('http://localhost:3000/api/gettable');
    let season = await axios.get('http://localhost:3000/api/getcurseason');

    return res.render('home', { data: respose.data, season: season.data[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching data from API');
  }
};

exports.customSelect = async (req, res) => {
  try {
    let seasons = await axios.get('http://localhost:3000/api/getseasons');
    let players = await axios.get('http://localhost:3000/api/getplayers');
    let respose = await axios.get('http://localhost:3000/api/gettable');

    let date = new Date(Date.now());
    date = date.toISOString().split('T')[0];

    return res.render('custom', {
      seasons: seasons.data,
      players: players.data,
      data: respose.data,
      date: date,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from API');
  }
};
