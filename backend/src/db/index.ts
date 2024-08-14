import mongoose from 'mongoose';

const CONNECT_DB = process.env.CONNECT_DB!;

mongoose.connect(CONNECT_DB);
