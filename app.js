const express = require('express')
const app = express()
const port = 4000
const proxy = require('express-http-proxy')


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/cityparking', proxy('https://www.cityofmadison.com/parking-utility/data/ramp-availability.json'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))