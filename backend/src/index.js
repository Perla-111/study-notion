import express from 'express';
import dotenv  from 'dotenv';

import {connectDB} from './config/database.js'

dotenv.config();

const PORT =  process.env.PORT;
const app = express();

app.use(express.json());

connectDB();

app.get('/', (req,res)=>{
    res.send('study notion application is running')
})

app.listen(PORT, ()=>{
console.log(`server is running on port ${PORT}`)
})