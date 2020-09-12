var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const { Schema } = mongoose;

var db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully to foster');
});

const fosterSchema = new Schema({
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
  color: String,
  coat: String,
  tail: String
});

fosterSchema.index({ puppy_id: 1 })

const FosterInfo = mongoose.model('Foster', fosterSchema);

// const selectAll = function(callback) {
//   Item.find({}, function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

module.exports = FosterInfo;