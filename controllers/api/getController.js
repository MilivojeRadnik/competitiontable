const pool = require('../../db');

exports.getPlayers = (req, res) => {
  pool.query('SELECT * FROM player', (err, result) => {
    if (err) return res.status(502).json({ message: 'database failure' });

    return res.json(result);
  });
};

exports.getActions = (req, res) => {
  pool.query('SELECT * FROM action', (err, result) => {
    if (err) return res.status(502).json({ message: 'database failure' });

    return res.json(result);
  });
};

exports.getSeasons = (req, res) => {
  pool.query('SELECT * FROM season ORDER BY start_at DESC', (err, result) => {
    if (err) return res.status(502).json({ message: 'database failure' });

    return res.json(result);
  });
};

exports.getPlays = (req, res) => {
  pool.query('SELECT * FROM play', (err, result) => {
    if (err) return res.status(502).json({ message: 'database failure' });

    return res.json(result);
  });
};

exports.getTable = (req, res) => {
  let season = req.query.season;
  let date = req.query.date;

  if (season !== undefined && date !== undefined)
    return res.status(502).json({ message: 'invalid endpoint' });

  let sql = 'SELECT player_id, name, sum(points) AS points FROM tbl_dates ';
  let options = [];

  if (season) {
    season = parseInt(season);

    if (isNaN(season))
      return res.status(502).json({ message: 'invalid endpoint' });

    sql +=
      'WHERE season_id = ? AND thrown_at IS NULL GROUP BY player_id ORDER BY points DESC;';
    options.push(season);
  } else if (date) {
    if (isNaN(Date.parse(date)))
      return res.status(502).json({ message: 'invalid endpoint' });

    sql +=
      'WHERE played_at <= ? AND season_id = (SELECT season_id FROM season WHERE start_at <= ? AND end_at >= ?) AND (thrown_at IS NULL OR thrown_at > ?) GROUP BY player_id ORDER BY points DESC;';
    options.push(date, date, date, date);
  } else {
    sql +=
      'WHERE played_at <= CURDATE() AND season_id = (SELECT season_id FROM season WHERE start_at <= CURDATE() AND end_at >= CURDATE()) AND (thrown_at IS NULL OR thrown_at > CURDATE()) GROUP BY player_id ORDER BY points DESC;';
  }

  pool.query(sql, options, (err, result) => {
    if (err) return res.status(502).json({ message: 'database failure' });

    return res.json(result);
  });
};

exports.getPlayerActions = (req, res) => {
  let player = req.query.player;
  let date = req.query.date;
  let season = req.query.season;

  if (isNaN(parseInt(player)))
    return res.status(400).json({ message: 'Bad request' });

  if (season !== undefined && date !== undefined)
    return res.status(502).json({ message: 'invalid endpoint' });

  let sql =
    'SELECT play_id, label, points, played_at, thrown_at FROM tbl_dates ';
  let values = [];

  if (season) {
    season = parseInt(season);

    if (isNaN(season))
      return res.status(502).json({ message: 'invalid endpoint' });

    sql += 'WHERE player_id = ? AND season_id = ? ';
    values.push(player, season);
  } else if (date) {
    if (isNaN(Date.parse(date)))
      return res.status(400).json({ message: 'Bad request' });

    sql +=
      'WHERE player_id = ? AND played_at <= ? AND season_id = (SELECT season_id FROM season WHERE ? >= start_at AND ? <= end_at) ';
    values = [player, date, date, date];
  } else {
    sql +=
      'WHERE player_id = ? AND season_id = (SELECT season_id FROM season WHERE CURDATE() >= start_at AND CURDATE() <= end_at) ';
    values = [player];
  }

  sql += 'ORDER BY played_at DESC;';

  pool.query(sql, values, (err, result) => {
    if (err) return res.status(502).json({ message: 'database failure' });

    return res.status(200).json(result);
  });
};

exports.getCurSeason = (req, res) => {
  let yourDate = new Date();
  const offset = yourDate.getTimezoneOffset();
  yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
  let date = yourDate.toISOString().split('T')[0];

  let sql =
    'SELECT season_id, label, date_format(start_at, "%d-%m-%Y") AS start_as, date_format(end_at, "%d-%m-%Y") AS end_at FROM season WHERE ? >= start_at AND ? <= end_at;';

  pool.query(sql, [date, date], (err, result) => {
    if (err) return res.status(502).json({ message: 'database failure' });

    return res.status(200).json(result);
  });
};
