require('./config/config')

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const _id = User.id
// const _name = User.name
// const _surname = User.surname
// const _username = User.username
// const _email = User.email

mongoose.connect(process.env.urlDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())
app.use(cors())

// Cambiar contraseña
app.post('/api/change-password', async (req, res) => {
	// const { token, newpassword: plainTextPassword } = req.body
	const token = req.body.token
	const plainTextPassword = req.body.password
	console.log(token + ' ' +  plainTextPassword);

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
		res.json({ status: 'error', error: 'Error de servidor interno. Su contraseña no se ha actualizado' })
	}
})

// Login
app.post('/api/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Usuario y/o contraseña incorrecto' })
	}

	// Compara la contraseña enviada por el usuario con la contraseña encriptada en la DDBB
	if (await bcrypt.compare(password, user.password)) {

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
				role: user.role
			},
			process.env.JWT_SECRET
		)

		return res.json({ status: 'ok', token: token })
	}

	res.json({ status: 'error', error: 'Usuario y/o contraseña incorrecto' })
})

// Registro de un nuevo usuario
app.post('/api/register', async (req, res) => {
	const { name, surname, username, email, password: plainTextPassword, confirm_password } = req.body

	if (!name || typeof name !== 'string') {
		return res.json({ status: 'error', error: 'Nombre con formato incorrecto' })
	}

	if (!surname || typeof surname !== 'string') {
		return res.json({ status: 'error', error: 'Apellidos con formato incorrecto' })
	}

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Nombre de usuario con formato incorrecto' })
	}

	if (!email || typeof email !== 'string') {
		return res.json({ status: 'error', error: 'Correo electrónico con formato incorrecto' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Contraseña con formato incorrecto' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'La contraseña es muy corta. Debe tener como mínimo 6 caracteres.'
		})
	}

	if (plainTextPassword !== confirm_password) {
		return res.json({
			status: 'error',
			error: 'Las contraseñas no coinciden'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			name,
			surname,
			username,
			email,
			password
		})
		console.log('Usuario creado correctamente: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'El nombre de usuario o correo electrónico ya está en uso' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

// Obtener datos del usuario logueado
app.get('/api/get-user-details/:id', async (req, res) => {

	const id = req.params.id

	try {
		const query = await User.find(
			{ _id: id }
		)
		res.json(query)
		console.log(query);
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'Usuario no encontrado' })
	}
})

// Actualizar datos del usuario logueado
app.post('/api/update-user-details', async (req, res) => {
	const updatedName = req.body.name
	const updatedSurname = req.body.surname
	const updatedUsername = req.body.username
	const updatedEmail = req.body.email
	const id = req.body.id

	if (id !== '' && updatedName !== '' && updatedSurname !== '' && updatedUsername !== '' && updatedEmail) {

		try {

			const query = await User.updateOne(
				{ _id: id },
				{
					name: updatedName,
					surname: updatedSurname,
					username: updatedUsername,
					email: updatedEmail
				}
			);

			if (query.nModified > 0) {
				res.json({ status: 'ok' })
			} else {
				res.json({ status: 'warning', error: 'Nada que actualizar' })
			}

		} catch (error) {
			if (error.code === 11000 && error.keyPattern['email'] == 1) {
				res.json({ status: 'error', error: 'El email ya está en uso' })

			} else if (error.code === 11000 && error.keyPattern['username'] == 1) {
				res.json({ status: 'error', error: 'El nombre de usuario ya está en uso' })

			} else {
				res.json({ status: 'error', error: 'No se han modificado los datos' })
			}
			res.json({ status: 'error', error: 'No se han modificado los datos' })			
		}

	} else {
		res.json({ status: 'error', error: 'Los datos a actualizar no pueden estar vacíos' })
	}
})

app.listen(process.env.PORT, () => {
	console.log(`Server up at ${process.env.PORT} -> http://localhost:${process.env.PORT}`)
})
