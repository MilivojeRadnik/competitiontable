const axios = require('axios');

exports.panelView = (req, res) => {
  data = [
    {
      name: 'Insert Play',
      key: '/postplay',
    },
    {
      name: 'Add New Player',
      key: '/insertplayer',
    },
    {
      name: 'Add New Action',
      key: '/insertaction',
    },
    {
      name: 'Change Action Points',
      key: '/updateaction',
    },
    {
      name: 'Throw Play',
      key: '/throw',
    },
  ];
  return res.render('list', { title: 'Admin Panel', data: data });
};

exports.postPlay = async (req, res) => {
  try {
    let players = await axios.get('http://localhost:3000/api/getplayers');
    let actions = await axios.get('http://localhost:3000/api/getactions');

    return res.render('admin/postPlay', {
      title: 'Insert Play',
      actions: actions.data,
      players: players.data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching data from API');
  }
};

exports.insertPlayer = (req, res) => {
  return res.render('admin/insertPlayer', { title: 'Insert Player' });
};

exports.insertAction = (req, res) => {
  return res.render('admin/insertAction', { title: 'Insert Action' });
};

exports.updateAction = async (req, res) => {
  try {
    let actions = await axios.get('http://localhost:3000/api/getactions');

    return res.render('admin/updateAction', {
      title: 'Change Action Points',
      actions: actions.data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching data from API');
  }
};

exports.insertThrow = async (req, res) => {
  try {
    let players = await axios.get('http://localhost:3000/api/getplayers');

    return res.render('admin/throw', {
      title: 'Throw Play',
      players: players.data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching data from API');
  }
};
