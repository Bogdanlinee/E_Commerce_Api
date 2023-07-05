require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const port = process.env.port || 5000;

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// router export
const authRouter = require('./routes/authRoutes');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// route
app.use('/api/v1/auth', authRouter)
app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/v1/', (req, res) => {
  console.log(req.cookies);
  console.log(req.signedCookies);
  res.send('hello world');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// connect DB
const db = require('./db/connect');

// connect DB and run server
const start = async () => {
  await db(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server is listening port ${port}...`);
  });
}

start();