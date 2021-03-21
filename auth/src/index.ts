import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose'

import { currentUserRouter } from './routes/current-user'
import { signinUserRouter} from './routes/signin'
import { signoutUserRouter} from './routes/signout'
import { signupUserRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found.error';

const app = express();
app.use(json());

//routes
app.use(currentUserRouter);
app.use(signinUserRouter);
app.use(signoutUserRouter);
app.use(signupUserRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
})

//middlewares
app.use(errorHandler);

const start = async () => {
  try{
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('connected to mongo on 27017 port');
  } catch(err) {
    console.log('error in db connect: ', err)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
}

start();

