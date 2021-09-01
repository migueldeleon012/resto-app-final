import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import itemsRouter from './routes/items.js';
import usersRouter from './routes/users.js';
const port = 8080;
const app = express();
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect('mongodb://localhost:27017/restoApp', options);
app.use(express.json());
app.use(cors());
app.use('/items', itemsRouter);
app.use('/users', usersRouter);
app.listen(port, () => console.log(`App is listening to port ${port}`));
