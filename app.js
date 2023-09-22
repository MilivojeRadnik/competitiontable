const express = require('express');
const app = express();

const apiRouter = require('./routers/api/apiRouter');
const viewRouter = require('./routers/view/viewRouter');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);
app.use('/', viewRouter);

app.get('/', (req, res) => {
  res.json({ message: 'use /api endpoint!' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port 3000');
});
