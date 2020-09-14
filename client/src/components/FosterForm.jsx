import React, { useState } from 'react';
import { Container, Avatar, Button, CssBaseline, TextField, FormControlLabel, Radio, RadioGroup, FormLabel, Checkbox, Link, Grid, Typography, FormGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PetsIcon from '@material-ui/icons/Pets';
import { useForm } from 'react-hook-form';
import StyledRadio from './StyledRadio';
import SelectFoster from './SelectFoster';
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

  const handleHasKidsChange = (event) => {
    setHasKids(!hasKids);
  };
  const handleHasAnimalsChange = (event) => {
    setHasAnimals(event.target.checked);
  };

  const onSubmit = (data) => {
    // **** futrue goal:
    // if the name and puppy does not match a previous doc
    // alert "info does not match our records"
    // if the name and puppy matched a previous doc
    
    // data.images = data.images[0];
    console.log("onsubmit", data)
    axios.post('/fosterForm', data)
      .then((res) => {
        console.log("from form submit", res)
      })
      .then(() => {
        props.returnHome()
      })
      .catch((err) => {
        console.log('fosterForm Post err: ', err)
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
          Please share your experience with your foster 🐶
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <select defaultValue='' name="foster_name" ref={register}>
            {props.allFosters.map((el) => {
              return <option value={el.foster_name} key={el.foster_name} >{el.foster_name}</option>

            })}
          </select>

          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="puppy_id"
            label="Puppy ID"
            type="number"
          />

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
          <select defaultValue='highlyActive' name="activityLevel" ref={register}>
            <option value='highlyActive'>Highly Active</option>
            <option value='active'>Active</option>
            <option value='notActive'>Not Active</option>
          </select>
          <br /> <br />

          <FormLabel>Coat?  </FormLabel>
          <select defaultValue='short' name="coat" ref={register}>
            <option value='short'>Short</option>
            <option value='medium'>Medium</option>
            <option value='long'>Long</option>
          </select>
          <br /> <br />

          <FormLabel>Tail?  </FormLabel>
          <select defaultValue='none' name="tail" ref={register} defaultValue>
            <option value='none'>None</option>
            <option value='straight'>Straight</option>
            <option value='curly'>Curly</option>
            <option value='curlsOver'>Curls Over</option>
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
            {/* upload images */}
            <input type='file' name='images' ref={register} />

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
          </FormGroup>

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