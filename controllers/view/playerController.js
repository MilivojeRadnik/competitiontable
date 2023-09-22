const axios = require('axios');

exports.players = async (req, res) => {
  try {
    let respose = await axios.get(
      req.protocol + '://' + req.get('host') + '/api/getplayers'
    );
    res.render('list', { data: respose.data, title: 'Players' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from API');
  }
};

exports.playerActions = async (req, res) => {
  let name = req.params.name;
  let player = req.query.player;

  if (isNaN(parseInt(player)))
    return res.status(502).json({ message: 'invalid endpoint' });

  try {
    let respose = await axios.get(
      req.protocol +
        '://' +
        req.get('host') +
        `/api/getplayeractions?player=${player}`
    );
    let season = await axios.get(
      req.protocol + '://' + req.get('host') + '/api/getcurseason'
    );
    res.render('playerActions', {
      data: respose.data,
      season: season.data[0],
      title: name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from API');
  }
};
