require('./config/config')

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

mongoose.connect(process.env.urlDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())
app.use(cors())

app.post('/api/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({
			status: 'error', 
			error: 'Formato de contraseña incorrecta'
		})
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'La contraseña es muy corta. Debe tener como mínimo 6 caracteres.'
		})
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET)

		const _id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})

app.post('/api/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Usuario y/o contraseña incorrecto' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			process.env.JWT_SECRET
		)

		return res.json({ status: 'ok', token: token })
	}

	res.json({ status: 'error', error: 'Usuario y/o contraseña incorrecto' })
})

app.post('/api/register', async (req, res) => {
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Nombre de usuario incorrecto' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Contraseña incorrecta' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'La contraseña es muy corta. Debe tener como mínimo 6 caracteres.'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('Usuario creado correctamente: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'El nombre de usuario ya está en uso' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

app.listen(process.env.PORT, () => {
	console.log(`Server up at ${process.env.PORT} -> http://localhost:${process.env.PORT}`)
})
