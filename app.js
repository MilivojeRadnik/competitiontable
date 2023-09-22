const express = require('express');
const app = express();
const favicon = require('serve-favicon');

const apiRouter = require('./routers/api/apiRouter');
const viewRouter = require('./routers/view/viewRouter');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);
app.use('/', viewRouter);

app.get('/', (req, res) => {
  res.json({ message: 'use /api endpoint!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
