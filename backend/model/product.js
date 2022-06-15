const { Decimal128 } = require('mongoose')
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		price: { type: Decimal128, required: true },
		short_description: { type: String },
		long_description: { type: String },
		password: { type: String, required: true },
		role: { type: String, required: true, default: 'customer'}
	},
	{ collection: 'product' }
)

const model = mongoose.model('ProductSchema', ProductSchema)

module.exports = model
