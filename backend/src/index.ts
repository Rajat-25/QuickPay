import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import './db/index';
import indexRouter from './routes/indexRoute';
const app = express();

const PORT = process.env.PORT ;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', indexRouter);

app.listen(PORT, () => {
  console.log('Server is running on Port: ' + PORT);
});
