var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const { Schema } = mongoose;

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully to admin');
});

const adminSchema = new Schema({
  puppy_id: Number,
  dateOfIntake: Date,
  approxDateOfBirth: Date,
  weight: Number,
  potenialBreed: [],
  gender: String,
  availForAdoption: Boolean,
  foster_id: Number,
  curFosterName: String,
  adoptionFee: Number,
  snDeposit: Number
});

adminSchema.index({ puppy_id: 1 })

const AdminInfo = mongoose.model('Admin', adminSchema);

module.exports = AdminInfo;
