// import the several dependencies
import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import bodyParser  from 'body-parser';
import { dataBaseConnection } from './dataBase.js';

//  server set-up
const app = express()
const PORT = process.env.PORT


// dataBase Connection
dataBaseConnection()

// middlewares
app.use(bodyParser.json())
app.use(cors());





// listen the server
app.listen(PORT , () => {
    console.log(`Server is running in ${PORT}`);
})