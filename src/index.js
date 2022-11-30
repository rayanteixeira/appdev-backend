const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');



const app = express();

mongoose.connect('mongodb+srv://mongodb.net/bdteste...')
app.use(express.json());
app.use(routes);


//porta
app.listen(3333);
