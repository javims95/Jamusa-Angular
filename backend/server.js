require('./config/config')

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose')
const routes = require('./routes/user');
const app = express()
// const _id = User.id

mongoose.connect(process.env.urlDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())
app.use(cors())

// routes
app.use(routes);

app.listen(process.env.PORT, () => {
	console.log(`Server up at ${process.env.PORT} -> http://localhost:${process.env.PORT}`)
})
