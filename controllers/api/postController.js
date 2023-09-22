const pool = require('../../db');

exports.postPlay = (req, res) => {
  console.log('laosldma');
  let schema = {
    action: req.body.action,
    player: req.body.player,
    date: req.body.date,
  };
  let values = [];

  if (!schema.action || !schema.player || schema.date === undefined)
    return res.status(400).json('Bad request');

  let sql =
    'INSERT INTO play (action_id, player_id, played_at, points, season_id) VALUES ';

  if (schema.date === 0) {
    sql +=
      '(?, ?, CURDATE(), (SELECT points FROM action WHERE action_id = ?), (SELECT season_id FROM season WHERE CURDATE() > start_at AND CURDATE() < end_at));';
    values = [schema.action, schema.player, schema.action];
  } else {
    sql +=
      '(?, ?, ?, (SELECT points FROM action WHERE action_id = ?), (SELECT season_id FROM season WHERE ? > start_at AND ? < end_at));';
    values = [
      schema.action,
      schema.player,
      schema.date,
      schema.action,
      schema.date,
      schema.date,
    ];
  }

  pool.query(sql, values, (err) => {
    if (err) return res.status(502).json({ message: 'database failure' });

    return res.status(200).redirect('back');
  });
};

exports.insertPlayer = (req, res) => {
  let name = req.body.name;

  if (name === undefined)
    return res.status(400).json({ message: 'Bad request' });

  pool.query('INSERT IGNORE INTO player(name) VALUES(?)', [name], (err) => {
    if (err) return res.status(502).json({ message: 'database failure' });

    return res.status(200).redirect('back');
  });
};

exports.updatePlayer = (req, res) => {
  let player = req.body.player;

  if (player === undefined)
    return res.status(400).json({ message: 'Bad request' });

  pool.query(
    'UPDATE player SET ingame = !ingame WHERE player_id = ?',
    [player],
    (err) => {
      if (err) return res.status(502).json({ message: 'database failure' });

      return res.status(200).end();
    }
  );
};

exports.insertAction = (req, res) => {
  let label = req.body.label;
  let points = req.body.points;

  if (label === undefined || points === undefined)
    return res.status(400).json({ message: 'Bad request' });

  pool.query(
    'INSERT INTO action(label, points) VALUES(?, ?)',
    [label, points],
    (err) => {
      if (err) return res.status(502).json({ message: 'database failure' });

      return res.status(200).redirect('back');
    }
  );
};

exports.updateAction = (req, res) => {
  let action = req.body.action;
  let points = req.body.points;

  console.log(action);

  if (action === undefined || points === undefined)
    return res.status(400).json({ message: 'Bad request' });

  pool.query(
    'UPDATE action SET points = ? WHERE action_id = ?',
    [points, action],
    (err) => {
      if (err) return res.status(502).json({ message: 'database failure' });

      return res.status(200).redirect('back');
    }
  );
};

exports.throwPlay = (req, res) => {
  let play = req.body.play;
  let date = req.body.date;

  if (play === undefined || date === undefined)
    return res.status(400).json({ message: 'Bad request' });

  pool.query(
    'INSERT INTO throw(play_id, thrown_at) VALUE(?,?)',
    [play, date],
    (err) => {
      if (err) return res.status(502).json({ message: 'database failure' });

      return res.status(200).redirect('back');
    }
  );
};
