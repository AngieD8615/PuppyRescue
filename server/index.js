var express = require('express');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
const faker = require('faker');
var FosterInfo = require('../db/fosterModel.js');
var AdminInfo = require('../db/adminModel.js');
const { makeStyles } = require('@material-ui/core');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/puppies', (req, res) => {
  res.status(200).send([
    {
      puppy_id: 2020858,
      dateOfIntake: '2020-09-05',
      approxDateOfBirth: '2020-06-01',
      weight: 24.5,
      gender: 'male',
      potentialBreed: ['terrier', 'pit', 'bear'],
      availForAdoption: true,
      curFoster_id: 858,
      curFosterName: "Angie Davidson",
      nightsStayed: 3,
      haveKids: false,
      haveAnimals: true,
      goodWithAnimals: true,
      disposition: ['shy', 'curious', 'cuddler'],
      activityLevel: 'not very',
      description: 'very sweet but also shy',
      images:[faker.image.image()],
      adoptionFee: 300,
      snDeposit: 100,
      color: 'Black',
      coat: 'short',
      tail: 'straight'
    },
    {
      puppy_id: 2020859,
      dateOfIntake: '2020-09-05',
      approxDateOfBirth: '2020-06-15',
      weight: 20.5,
      gender: 'male',
      potentialBreed: ['lab', 'whippet', 'bear'],
      availForAdoption: true,
      curFoster_id: 859,
      curFosterName: "Mary Ann",
      nightsStayed: 3,
      haveKids: false,
      haveAnimals: false,
      disposition: ['playful', 'happy'],
      activityLevel: 'very',
      description: 'very sweet, love to play',
      images:[faker.image.image(), faker.image.image()],
      adoptionFee: 300,
      snDeposit: 100,      color: 'Black',
      coat: 'short',
      tail: 'straight'
    },
    {
      puppy_id: 2020860,
      dateOfIntake: '2020-08-027',
      approxDateOfBirth: '2020-06-01',
      weight: 10.5,
      gender: 'female',
      potentialBreed: ['poodle', 'frog', 'cat'],
      availForAdoption: true,
      curFoster_id: 858,
      curFosterName: "Angie Davidson",
      nightsStayed: 3,
      haveKids: true,
      goodWithKids: true,
      haveAnimals: false,
      disposition: ['yes', 'hello', 'world'],
      activityLevel: 'VERY',
      description: 'more words here',
      images:[faker.image.image(), faker.image.image(), faker.image.image()],
      adoptionFee: 300,
      snDeposit: 100,      color: 'Black',
      coat: 'short',
      tail: 'straight'
    }
  ])
});


app.post('/fosterInfo', (req, res) => {
  console.log('fosterInfo', req.body)
})

app.post('/adminInfo', (req, res) => {
  console.log('adminInfo', req.body)
})


app.listen(3100, function () {
  console.log('listening on port 3100!');
});

