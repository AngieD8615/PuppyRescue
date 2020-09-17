var PORT = process.env.PORT || 3100
const express = require('express');
const faker = require('faker');
const Foster = require('../db/fosterModel.js');
const selectAllFosters = require('../db/fosterModel.js');
const Puppies = require('../db/puppyModel.js');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const url = require('url');
require('dotenv').config()

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const s3 = new aws.S3({
  accessKeyId: ACCESSKEYID,
  secretAccessKey: SECRETACCESSKEY,
  Bucket: 'rescuepuppies'
});

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

const PuppyGallery = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'rescuepuppies',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
  }),
  limits: { fileSize: 3000000 }, // In bytes: 3000000 bytes = 3 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).array('galleryImage', 4);

app.post('/images', (req, res) => {
  console.log('server fired')
  PuppyGallery(req, res, (error) => {
    console.log('files', req.files);
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.files === undefined) {
        console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      } else {
        // If Success
        let fileArray = req.files,
          fileLocation;
        const galleryImgLocationArray = [];
        for (let i = 0; i < fileArray.length; i++) {
          fileLocation = fileArray[i].location;
          console.log('filenm', fileLocation);
          galleryImgLocationArray.push(fileLocation)
        }
        // Save the file name into database
        res.json({
          filesArray: fileArray,
          locationArray: galleryImgLocationArray
        });
      }
    }
  });
});


app.get('/puppies', (req, res) => {
  Puppies
    .find({})
    .then((data) => {
      console.log(data)
      res.status(200).send(data)
    });
});

app.get('/fosters', (req, res) => {
  Foster
    .find({}, null, {sort: {foster_name: 1}})
    .then((data) => {
      res.status(200).send(data)
    })
});

app.put('/fosterForm', (req, res) => {
  console.log('fosterInfo from server', req.body)
  var condition = { 
    puppy_id: req.body.puppy_id,
    foster_name: req.body.foster_name  
  }
  Puppies
    .updateOne(condition, req.body)
    .then((doc) => {
      return res.status(200).json(doc)
    });
});

app.post('/adminIntakeForm', (req, res) => {
  console.log('admin', req.body)
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

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`);
});
