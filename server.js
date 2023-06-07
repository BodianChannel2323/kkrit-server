// импорт
const express = require('express')
const cors = require('cors')

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'navigator_kkrit',
    password: '1Was#born@in24theRussia'
});
// экземпляр
const app = express()
app.use(cors())
//
// port
const port = 7777
// connection.connect();
const publicDir = require('path').join(__dirname, '/public');
app.use(express.static(publicDir));

app.get('/new/cabinets', (req, res) => {
    // Поиск по бд таблицы cabinet
    connection.connect();
    connection.query(`SELECT * FROM navigator_kkrit.cabinet WHERE cabinet.namecab = "${req.query.cab_name}"`, function (err, rows, fields) {
        if (err) throw err;
        const hostName = "http://" + req.hostname + ":" + port
        const result = rows.map((item) => {
            item.mapcab = hostName + "/cabinets/" + item.mapcab;

            return item;
        })
        res.send(result)
    })
})
// поиск по бд таблицы ways
app.get('/new/ways', (req, res) => {
    connection.connect();
    connection.query(`SELECT * FROM navigator_kkrit.ways WHERE ways.pointa = "${req.query.from}" AND ways.pointb = "${req.query.to}"`, function (err, rows, fields) {
        if (err) throw err;
        const hostName = "http://" + req.hostname + ":" + port
        const result = rows.map((item) => {
            item.map1 = hostName + "/ways/" + item.map1;
            item.map2 = hostName + "/ways/" + item.map2;
            item.map3 = hostName + "/ways/" + item.map3;
            item.map4 = hostName + "/ways/" + item.map4;

            return item;
        })
        res.send(result)
    })
})
// POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage');
});
// https://expressjs.com/ru/starter/hello-world.html
app.listen(port, () => {
    console.log(`Запуск listening on port ${port}`)
})

