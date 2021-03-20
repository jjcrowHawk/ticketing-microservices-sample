import express from 'express';
import { json } from 'body-parser';

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

app.get('*', async (req, res) => {
  throw new NotFoundError();
})

//middlewares
app.use(errorHandler);


app.listen(3000, () => {
  console.log('Listening on port 3000!!!!!!!!');
});

