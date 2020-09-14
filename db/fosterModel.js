var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RescuePups');
const { Schema } = mongoose;

var db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully to foster');
});

const fosterSchema = new Schema({
  foster_name: String,
});

const Foster = mongoose.model('Foster', fosterSchema);

module.exports = Foster;
