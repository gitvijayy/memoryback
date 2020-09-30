const Express = require('express');
const path = require('path');

const app = Express();
const BodyParser = require('body-parser');
const compression = require('compression');

const cors = require('cors');

const passport = require('./config/passport');

const { devErrorHandler } = require('./config/error-middleware');

const PORT = process.env.PORT || 8080;

app.use(Express.static(path.join(__dirname, 'client/build')));
app.use(Express.static('public'));
app.use('/api/public/assets/logo', Express.static('public/assets/logo'));
app.use(BodyParser.urlencoded({ extended: false }));
app.use(Express.json({ limit: '2mb' }));
app.use(compression());
app.use(passport.passport.initialize());
app.use(cors());

// for server side cookies
// app.use(
//   cors({
//     origin: [
//       // `${process.env.FRONT_URL}`,
//       'http://localhost:3000',
//     ],
//     credentials: true,
//   })
// );

require('./api')(app);

if (process.env.ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'client/build') });
  });
}

app.use(devErrorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express listening on port ${PORT} => ENV => ${process.env.ENV || 'development'}`);
  // eslint-disable-next-line no-console
  process.on('SIGINT', () => {
    console.log('Bye bye!');
    process.exit();
  });
});

// app.use(queryLogger(db));
// app.use(cookiesMiddleware());
// const queryLogger = require('knex-logger');
// const general = require('./api/helpers');
// const logger = require('./config/winston');
// const db = require('./config/db')(app);
// const routeHandlers = {
//   app,
//   db,
//   catchErrors,
//   throwError,
//   general,
//   logger,
//   passport,
// };
// require('./utilities/intervals');
