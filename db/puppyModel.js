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

const puppySchema = new Schema({
  puppy_id: Number,
  foster_name: String,
  nightsStayed: Number,
  haveKids: Boolean,
  goodWithKids: Boolean,
  haveAnimals: Boolean,
  goodWithAnimals: Boolean,
  disposition: [],
  activityLevel: String,
  description: String,
  images: [],
  color: [],
  coat: String,
  tail: String,
  dateOfIntake: Date,
  approxDateOfBirth: Date,
  weight: Number,
  potenialBreed: [],
  gender: String,
  availForAdoption: Boolean,
  foster_history: Number,
  adoptionFee: Number,
  snDeposit: Number
});

puppySchema.index({ puppy_id: 1 })

const Puppies = mongoose.model('Puppies', puppySchema);

// const selectAll = function(callback) {
//   Item.find({}, function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

module.exports = Puppies;