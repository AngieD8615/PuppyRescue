import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Radio, RadioGroup, FormLabel, Checkbox, Link, Grid, Typography, FormGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PetsIcon from '@material-ui/icons/Pets';
import { useForm } from 'react-hook-form';
import StyledRadio from './StyledRadio';
import axios from 'axios';
import SelectFoster from './SelectFoster';

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
  const { register, handleSubmit } = useForm()


  const onSubmit = (data) => {
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
            required
            fullWidth
            name="puppy_id"
            label="Puppy ID"
            type="number"
          />

          <SelectFoster allFosters={props.allFosters}/>
          {/* date of intake */}
          {/* date of birth */}
          {/* weight */}
          {/* Breed */}
          {/* Available for adoption */}
          {/* adoption fee */}
          {/* sn deposit */}
          <FormControlLabel
            control={<Checkbox inputRef={register} name="hasKids" color="primary" />}
            label="I have kids under 10 at home"
            labelPlacement="start"
          />


          <FormControlLabel
            control={<Checkbox inputRef={register} name="hasAnimals" color="primary" />}
            label="I have other animals at home"
            labelPlacement="start"
          />


          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="gender" name="gender">
            <FormControlLabel value="female" control={<StyledRadio inputRef={register} name="gender" />} label="Female" />
            <FormControlLabel value="male" control={<StyledRadio inputRef={register} name="gender" />} label="Male" />
          </RadioGroup>

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
          <select defaultValue='none' name="Tail" ref={register} defaultValue>
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
              control={<Checkbox inputRef={register} name="Disposition" />}
              label="Likes everyone"
            />
            <FormControlLabel
              value="Shy with strangers"
              control={<Checkbox inputRef={register} name="Disposition" />}
              label="Shy with strangers"
            />
            <FormControlLabel
              value="Playful"
              control={<Checkbox inputRef={register} name="Disposition" />}
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
