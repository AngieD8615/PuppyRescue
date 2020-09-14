var express = require('express');
const faker = require('faker');
const Foster = require('../db/fosterModel.js');
const selectAllFosters = require('../db/fosterModel.js');
var Puppies = require('../db/puppyModel.js');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/puppies', (req, res) => {
  Puppies
    .find({})
    .then((data) => {
      console.log(data)
      res.status(200).send(data)
    });
  // res.status(200).send(
  //   [
      // {
      //   puppy_id: 858,
      //   foster_name: "Angie Davidson",
      //   nightsStayed: 3,
      //   haveKids: false,
      //   haveAnimals: true,
      //   goodWithAnimals: true,
      //   disposition: ['shy', 'curious', 'cuddler'],
      //   activityLevel: 'not very',
      //   description: 'very sweet but also shy',
      //   color: ['Black'],
      //   coat: 'short',
      //   tail: 'straight'
      //   dateOfIntake: '2020-09-05',
      //   approxDateOfBirth: '2020-06-01',
      //   weight: 24.5,
      //   potentialBreed: ['terrier', 'pit', 'bear'],
      //   gender: 'male',
      //   availForAdoption: true,
      //   adoptionFee: 300,
      //   snDeposit: 100,
      // }
  //   ])
});

app.get('/fosters', (req, res) => {
  Foster
    .find({})
    .then((data) => {
      res.status(200).send(data)
    })
});

// app.post('/fosterForm', (req, res) => {
//   console.log('fosterInfo from server', req.body)

//   Puppies
//     .updateOne({ puppy_id : {$gt: `${req.body.puppy_id}` }}, req.body)
//     .then(() => {
//       res.status(200).send("Added a puppy!")
//     });
// });

app.post('/fosterForm', (req, res) => {
  Puppies
    .create(req.body)
    .then(() => {
      res.status(200).send('Puppy added to database')
    })
    .catch((err) => {
      console.log(err)
    });
})


app.post('/addFoster', (req, res) => {
  console.log('adminInfo', req.body)
  Foster
    .create(req.body)
    .then(() => {
      res.status(200).send("Added a foster")
    });
});

app.post('/adminIntakeForm', (req, res) => {
  Puppies
    .create(req.body)
    .then(() => {
      res.status(200).send('Puppy added to database')
    })
    .catch((err) => {
      console.log(err)
    });
})


app.listen(3100, function () {
  console.log('listening on port 3100!');
});
