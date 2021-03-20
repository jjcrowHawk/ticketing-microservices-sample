import express from 'express';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user'
import { signinUserRouter} from './routes/signin'
import { signoutUserRouter} from './routes/signout'
import { signupUserRouter } from './routes/signup';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinUserRouter);
app.use(signoutUserRouter);
app.use(signupUserRouter);


app.listen(3000, () => {
  console.log('Listening on port 3000!!!!!!!!');
});

