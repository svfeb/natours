//start server
const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('unhandledExecption', err => {
  console.log('UNHANDLED EXCEPTION! shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DBconnection successful');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('working');
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
