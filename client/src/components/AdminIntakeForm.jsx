import React, { useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Avatar, Button, OutlinedInput, InputAdornment, CssBaseline, TextField, FormControlLabel, Radio, RadioGroup, FormLabel, Checkbox, Link, Grid, Typography, FormGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PetsIcon from '@material-ui/icons/Pets';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import StyledRadio from './StyledRadio';
import SelectFoster from './SelectFoster';
import DatePicker from './DatePicker.jsx';
import capitalizeName from './CapitalizeName.js';
import Tooltip from '@material-ui/core/Tooltip';


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



export default function AdminIntakeForm(props) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [breeds, setBreeds] = useState([]);
  const [curBreed, setCurBreed] = useState('');


  const handleBreedOnChange = (event) => {
    setCurBreed(event.target.value)
  }

  const handleRemoveBreed = (index) => {
    let revisedBreeds = breeds.slice();
    for (var i = 0; i < revisedBreeds.length - 1; i++) {
      if (i >= index) {
        revisedBreeds[i] = breeds[i+1]
      }
    }
    revisedBreeds.pop()
    setBreeds( revisedBreeds )
  
  }
  const handleAddBreed = () => {
    let capitalizedBreed = capitalizeName(curBreed);

    //ensure that the add breed is unique
    let isUniqueBreed = true
    for (var i = 0; i < breeds.length; i++) {
      if (breeds[i] === capitalizedBreed) {
        isUniqueBreed = false;
        break;
      }
    };
    (isUniqueBreed) ? setBreeds(breeds.concat(capitalizedBreed)) : alert(`Already have ${capitalizedBreed}`)
    setCurBreed('')
  }

  const onSubmit = (data) => {
    data.potentialBreed = breeds;
    data.puppy_id = Number(data.puppy_id)

    axios.post('/adminIntakeForm', data)
      .then((res) => {
        console.log("from admin intake submit", res)
      })
      .then(() => {
        props.returnHome()
      })
      .catch((err) => {
        console.log('adminIntakeForm Post err: ', err)
      })
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PetsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Intake 🐶 Data
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            defaultValue={props.nextPupIndex}
            required
            fullWidth
            name="puppy_id"
            label="Puppy ID"
            type="number"
          />

          <TextField
            inputRef={register}
            InputProps={{
              endAdornment: <InputAdornment position="start">lbs</InputAdornment>,
            }}
            required
            fullWidth
            name="weight"
            label="Weight"
            type="number"
            variant="outlined"
          />
          <br /> <br />
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="gender" name="gender">
            <FormControlLabel value="male" control={<StyledRadio inputRef={register} name="gender" />} label="Male" />
            <FormControlLabel value="female" control={<StyledRadio inputRef={register} name="gender" />} label="Female" />
          </RadioGroup>

          {/* Breed */}
          <TextField
            fullWidth
            name="breed"
            label="Breed"
            type="text"
            variant="outlined"
            value={curBreed}
            onChange={handleBreedOnChange}
          />
          <Button
            type='button'
            variant="contained"
            color="primary"
            onClick={handleAddBreed}
          >
            Add a potential breed
          </Button>
          <Typography variant="body1" gutterBottom>
            The breed is currently set to: {(breeds.length === 0) ? 'unknown' :
              breeds.map((el, index) => {
                return (
                  <Tooltip title="remove" key={el} arrow>
                    <Button type='button' onClick={() => { handleRemoveBreed(index) }} aria-label={el}>{(index < breeds.length - 1) ? `${el} /` : `${el}`}</Button>
                  </Tooltip>
                )
              })
            }
          </Typography>

          {/* <DatePicker /> */}

          <FormControlLabel
            control={<Checkbox inputRef={register} name="availForAdoption" color="primary" />}
            label="Avaialable for Adoption"
            labelPlacement="start"
          />
          <br />
          <TextField
            variant="outlined"
            margin="normal"
            defaultValue={300}
            inputRef={register}
            required
            name="adoptionFee"
            label="Adoption Fee"
            type="number"
          />
          <TextField
            variant="outlined"
            margin="normal"
            defaultValue={100}
            inputRef={register}
            required
            name="snDeposit"
            label="S/N deposit"
            type="number"
          />
          <br />

          <select defaultValue='' name="foster_name" ref={register}>
            {props.allFosters.map((el) => {
              return <option value={el.foster_name} key={el.foster_name} >{el.foster_name}</option>

            })}
          </select>
          {/* date of intake */}
          {/* date of birth */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Post
          </Button>
        </form>
      </div>
    </Container>
  );
}
