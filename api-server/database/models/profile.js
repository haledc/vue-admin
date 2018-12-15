const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  income: {
    type: Number,
    required: true
  },
  expend: {
    type: Number,
    required: true
  },
  cash: {
    type: Number,
    required: true
  },
  remark: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Profile', profileSchema)
