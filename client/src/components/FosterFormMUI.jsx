import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, FormLabel, RadioGroup, Checkbox, Link, Grid, Typography, FormGroup} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
  const onSubmit = (data) => {
    axios.post('/fosterForm', data)
      .then((res) => {
        console.log('fired from form')
        console.log(res)
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
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            id="curFosterName"
            label="Name"
            name="curFosterName"
            autoFocus
          />
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
            control={<Checkbox inputRef={register} name="hasKids" color="primary" />}
            label="I have kids under 10 at home"
            labelPlacement="start"
          />
          <FormControlLabel
            control={<Checkbox inputRef={register} name="HasAnimals" color="primary" />}
            label="I have other animals at home"
            labelPlacement="start"
          />

          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="gender" name="gender">
            <FormControlLabel value="female" control={<StyledRadio inputRef={register} name="gender" />} label="Female" />
            <FormControlLabel value="male" control={<StyledRadio inputRef={register} name="gender" />} label="Male" />
          </RadioGroup>

          <FormLabel>Length to stay?  </FormLabel>
          <select name="nightsStayed" ref={register}>
            <option selected value={0}>0 nights</option>
            <option value={1}>1 night</option>
            <option value={2}>2 nights</option>
            <option value={3}>3 nights</option>
            <option value={4}>4 nights</option>
            <option value={5}>5 nights</option>
            <option value={6}>6 nights</option>
            <option value={7}>7+ nights</option>
          </select>
          <br />

          <FormLabel>Coat?  </FormLabel>
          <select name="coat" ref={register}>
            <option selected value='short'>Short</option>
            <option value='medium'>Medium</option>
            <option value='long'>Long</option>
          </select>
          <br />

          <FormLabel>Tail?  </FormLabel>
          <select name="Tail" ref={register} defaultValue>
            <option selected value='none'>None</option>
            <option value='straight'>Straight</option>
            <option value='curly'>Curly</option>
            <option value='curlsOver'>Curls Over</option>
          </select>
          <br />

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
          </FormGroup>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}