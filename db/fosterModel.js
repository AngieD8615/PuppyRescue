require('dotenv').config()
var mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@puppyrescue.baqif.mongodb.net/puppyRescue?retryWrites=true&w=majority`);
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

// var mysort = {foster_name: 1};

// const selectAllFosters = function(callback) {
//   Foster.find({}, function (err, result) {  
//     if (err) {
//       console.log("error query");
//     } else {
//       console.log(result);
//     }
//   }).sort(mysort);
// }
  
// module.exports = selectAllFosters;
module.exports = Foster;
