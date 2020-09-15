import React, { useState } from 'react';
import { Container, Avatar, Button, CssBaseline, TextField, FormControlLabel, RadioGroup, FormLabel, Checkbox, Link, Grid, Typography, FormGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PetsIcon from '@material-ui/icons/Pets';
import { useForm } from 'react-hook-form';
import StyledRadio from './StyledRadio';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function FosterForm(props) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm()
  const [hasKids, setHasKids] = useState(false);
  const [hasAnimals, setHasAnimals] = useState(false);
  const [picsToAWS, setPicsToAWS] = useState([]);
  const [imgURL, setImgURL] = useState([]);


  const handleHasKidsChange = (event) => {
    setHasKids(!hasKids);
  };
  const handleHasAnimalsChange = (event) => {
    setHasAnimals(event.target.checked);
  };

  const multipleFileChangedHandler = (event) => {
    setPicsToAWS(event.target.files);
    console.log(event.target.files)
  };

  const multipleFileUploadHandler = () => {
    const data = new FormData();
    let selectedFiles = picsToAWS;
    console.log(selectedFiles);
    // If file selected
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        data.append('galleryImage', selectedFiles[i], selectedFiles[i].name);
      }
      axios.post('/images', data, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
      })
        .then((res) => {
          console.log(res.data.locationArray)
          setImgURL(res.data.locationArray);
        })
        .then(() => {
          console.log('imgURL', imgURL)
        })
        .catch((error) => {
          // If another error
          console.log(error, 'red');
        });
    } else {
      // if file not selected throw error
      console.log('Please upload file', 'red');
    }
  };


  const onSubmit = (data) => {
    // **** futrue goal:
    // if the name and puppy does not match a previous doc
    // alert "info does not match our records"
    // if the name and puppy matched a previous doc
    let isValid = false;
    console.log(typeof data.puppy_id, data.foster_name, props.puppyInfo, isValid)
    props.puppyInfo.forEach((el) => {
      console.log(typeof el.puppy_id, el.foster_name)
      if (el.puppy_id === Number(data.puppy_id) && el.foster_name === data.foster_name) {
        isValid = true;
      }
    });

    if (isValid) {
    data.images = imgURL;
    console.log("onsubmit", data)

    axios.put('/fosterForm', data)
      .then((res) => {
        console.log("from form submit", res)
      })
      .then(() => {
        props.returnHome()
      })
      .catch((err) => {
        console.log('fosterForm Post err: ', err)
      })
    } else {
      alert('Your information does not match our records.')
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PetsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Please share your experience with your foster 🐶
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <select defaultValue='' name="foster_name" ref={register}>
            <option value="name" >Name</option>
            {props.allFosters.map((el) => {
              return <option value={el.foster_name} key={el.foster_name} >{el.foster_name}</option>
            })}
          </select>

          <select defaultValue='' name="puppy_id" ref={register}>
            <option value='puupy_id' >Puppy ID</option>
            {props.puppyInfo.map((el) => {
              return <option value={el.puppy_id} key={el.puppy_id} >{el.puppy_id}</option>
            })}
          </select>

          {/* upload images */}
          <div className="card border-light mb-3" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
            <div className="card-header">
              <h3 style={{ color: '#555', marginLeft: '12px' }}>Upload Images - Max 3MB</h3>
            </div>
            <div className="card-body">
              <input type="file" multiple onChange={multipleFileChangedHandler} />
              <div className="mt-5">
                <button type="button" className="btn btn-info" onClick={multipleFileUploadHandler}>Upload!</button>
              </div>
            </div>
          </div>

          <FormControlLabel
            control={<Checkbox inputRef={register} name="haveKids" color="primary" onChange={handleHasKidsChange} />}
            label="I have kids under 10 at home"
            labelPlacement="start"
          />
          {(hasKids) ? (
            <>
              <FormLabel component="legend">Puppy was good with kids?</FormLabel>
              <RadioGroup aria-label="goodWithKids" name="goodWithKids">
                <FormControlLabel value="true" control={<StyledRadio inputRef={register} name="goodWithKids" />} label="Yes" />
                <FormControlLabel value="false" control={<StyledRadio inputRef={register} name="goodWithKids" />} label="No" />
              </RadioGroup>
            </>
          ) : null}

          <FormControlLabel
            control={<Checkbox inputRef={register} name="haveAnimals" color="primary" onChange={handleHasAnimalsChange} />}
            label="I have other animals at home"
            labelPlacement="start"
          />
          {(hasAnimals) ? (
            <>
              <FormLabel component="legend">Puppy was good with animals?</FormLabel>
              <RadioGroup aria-label="goodWithAnimals" name="goodWithAnimals">
                <FormControlLabel value="true" control={<StyledRadio inputRef={register} name="goodWithAnimals" />} label="Yes" />
                <FormControlLabel value="false" control={<StyledRadio inputRef={register} name="goodWithAnimals" />} label="No" />
              </RadioGroup>
            </>
          ) : null}
          <br />
          <FormLabel>Length to stay?  </FormLabel>
          <select defaultValue={0} name="nightsStayed" ref={register}>
            <option value={0}>0 nights</option>
            <option value={1}>1 night</option>
            <option value={2}>2 nights</option>
            <option value={3}>3 nights</option>
            <option value={4}>4 nights</option>
            <option value={5}>5 nights</option>
            <option value={6}>6 nights</option>
            <option value={7}>7+ nights</option>
          </select>
          <br /> <br />

          <FormLabel>Activity Level?  </FormLabel>
          <select defaultValue='Highly Active' name="activityLevel" ref={register}>
            <option value='Highly Active'>Highly Active</option>
            <option value='Active'>Active</option>
            <option value='Not Active'>Not Active</option>
          </select>
          <br /> <br />

          <FormLabel>Coat?  </FormLabel>
          <select defaultValue='Short' name="coat" ref={register}>
            <option value='Short'>Short</option>
            <option value='Medium'>Medium</option>
            <option value='Long'>Long</option>
          </select>
          <br /> <br />

          <FormLabel>Tail?  </FormLabel>
          <select defaultValue='None' name="tail" ref={register} defaultValue>
            <option value='None'>None</option>
            <option value='Straight'>Straight</option>
            <option value='Curly'>Curly</option>
            <option value='Curls Over'>Curls Over</option>
          </select>
          <br /> <br />

          <FormLabel>Coloring</FormLabel>
          <FormGroup>
            <FormControlLabel
              value="Black"
              control={<Checkbox inputRef={register} name="color" />}
              label="Black"
            />
            <FormControlLabel
              value="White"
              control={<Checkbox inputRef={register} name="color" />}
              label="White"
            />
            <FormControlLabel
              value="Light Brown"
              control={<Checkbox inputRef={register} name="color" />}
              label="Light Brown"
            />
            <FormControlLabel
              value="Dark Brown"
              control={<Checkbox inputRef={register} name="color" />}
              label="Dark Brown"
            />
            <FormControlLabel
              value="Has a spot(s)"
              control={<Checkbox inputRef={register} name="color" />}
              label="Has a spot(s)"
            />
          </FormGroup>

          <FormLabel>Disposition</FormLabel>
          <FormGroup>
            <FormControlLabel
              value="Likes everyone"
              control={<Checkbox inputRef={register} name="disposition" />}
              label="Likes everyone"
            />
            <FormControlLabel
              value="Shy with strangers"
              control={<Checkbox inputRef={register} name="disposition" />}
              label="Shy with strangers"
            />
            <FormControlLabel
              value="Playful"
              control={<Checkbox inputRef={register} name="disposition" />}
              label="Playful"
            />
          </FormGroup>

          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            id="description"
            label="Foster Notes"
            name="description"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {(imgURL.length === 0) ? 'POST WITHOUT IMAGES' : 'POST WITH IMAGES'}
          </Button>
        </form>
      </div>
    </Container>
  );
}