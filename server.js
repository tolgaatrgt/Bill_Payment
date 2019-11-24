const express = require('express');
const gediz = require('./routes/gediz')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(morgan())
app.use('/gediz', gediz);
app.listen(5000, () => {
    console.log('Server is running on 5000');

});



