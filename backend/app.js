//import authRouter from "./router/auth";

const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose'); //should be added after the cors

const app = express();
//const bodyParser = require('body-parser');

require('dotenv').config();

const port = process.env.PORT || 4000;


//app.use(bodyParser.json());
app.use(cors()); //Now, after the line app.use(express.json());, add:
const uri = process.env.ATLAS_URI;


app.use(express.json());

mongoose.connect(uri, {  useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true});

const connection = mongoose.connection;
connection.once('open', () => { console.log("MongoDB database connection established succesfully"); });

app.use(express.json());
//app.use("/", authRouter);

const usersRouter = require('./routes/users')

app.use('/api/users', usersRouter)
/*app.get(
    '/',
    (req,res) => {
        res.send('hello');
    }
)*/

app.listen(port, () => {
    console.log('server is running on port:' + port);
});





