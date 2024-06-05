const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({}));

app.get('/', (req,res) => {
    res.status(200).send({
        infoBaru : 'NodeJS, ExpressJS, PostgreSQL'
    });
});

const { carRouter, orderRouter } = require('./Routers');

app.use('/car', carRouter);
app.use('/order', orderRouter);

app.listen(port, () => {
    console.log(`App is running on ${port}`);
})