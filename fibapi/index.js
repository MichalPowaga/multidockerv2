const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
    host: keys.pgHost,
    port: keys.pgPort,
    database: keys.pgDatabase,
    user: keys.pgUser,
    password: keys.pgPassword,
});

// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000,
});
const redisPublisher = redisClient.duplicate();

// Express route handlers

app.get('/', (req, res) => {
    res.send('Hi');
});

app.get('/values/all', async (req, res) => {
    /*
    await pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT);');
    const values = await pgClient.query('select * from values');
    res.send(values.rows);
    */
    res.send([ { number: 33 }, { number: 22 }, { number: 80085 } ]);
});

app.get('/values/current', async (req, res) => {
    /*
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    });
    */
   const arr = [];
    arr['1'] = '1';
    arr['3'] = '2';
    arr['4'] = '1111234500';
    res.send(arr)
});

app.post('/values', async (req, res) => {
    const index = req.body.index;

    const maxIndex = 40;
    
    if (parseInt(index) > maxIndex || isNaN(parseInt(index))) {
        return res.status(422).send('Missing index or too high (index: ' + index +')');
    }

    redisClient.hset('values', index, 'Nothing yet!');
    redisPublisher.publish('insert', index);
    await pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT);');
    pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

    res.send({ working: true });
});

app.listen(5000, (err) => {
    console.log('Listening at port 5000');
});
