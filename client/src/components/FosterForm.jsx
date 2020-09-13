import React from 'react'
import { useForm } from 'react-hook-form'
import { Grid, Button, Typography, TextField, FormLabel, FormControl, FormControlLabel, Switch, Select, InputLabel, MenuItem, Radio, RadioGroup } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const FosterForm = () => {
  const { register, handleSubmit, errors } = useForm()
  // const history = useHistory()

  // const onSubmit = (data) => {
  //   history.push('/FosterFormStep2')
  // }

  const onSubmit = (data) => {
    console.log(data)
  }
  // const [nightsStayed, setNightsStayed] = React.useState(0);
  // const [hasKids, setHasKids] = React.useState(false);
  // const [goodWithKids, setGoodWithKids] = React.useState(false);
  // const [hasAnimals, setHasAnimals] = React.useState(false);
  // const [goodWithAnimals, setGoodWithAnimals] = React.useState(false);
  // const [gender, setGender] = React.useState('');

  // const handleGoodWithKidsChange = (event) => {
  //   setGoodWithKids(event.target.value);
  // }
  // const handleHasAnimalsChange = (event) => {
  //   setHasAnimals(event.target.value);
  // };
  // const handleGoodWithAnimalsChange = (event) => {
  //   setGoodWithAnimals(event.target.value);
  // };

  // const handleHasKidsChange = (event) => {
  //   setHasKids(event.target.value);
  // };
  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  // };
  // const handleNightsStayedChange = (event) => {
  //   setNightsStayed(event.target.value);
  // };


  return (
    <div>
      <Typography component='h2' variant='h5' align='center'>
        Please share your experience with your foster puppy 🐶 🐕 🐩
      </Typography>
      <form align='center' onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>Foster Name</FormLabel>
        <TextField
          variant="outlined"
          ref={register}
          name='curFosterName'
          type='text'
          placeholder='foster name'
        /> <br />
        <FormLabel>Puppy ID</FormLabel>
        <TextField
          variant="outlined"
          ref={register}
          name='puppy_id'
          type='text'
          placeholder='puppy id'
        /> <br />

        {/* <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup  align='center' aria-label="gender" name="gender" value={null} ref={register}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>

        <FormLabel component="legend">Kids under 10?</FormLabel>
        <RadioGroup aria-label="hasKids" name="hasKids" value={null} ref={register}>
          <FormControlLabel value="false" control={<Radio />} label="No" />
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
        </RadioGroup>
        {(hasKids === "true") ? (
          <>
            <FormLabel component="legend">Puppy was good with kids?</FormLabel>
            <RadioGroup aria-label="goodWithKids" name="goodWithKids" value={null} ref={register}>
              <FormControlLabel value="false" control={<Radio />} label="No" />
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
            </RadioGroup>
          </>
        ) : null}
        <FormLabel component="legend">Other animals?</FormLabel>
        <RadioGroup aria-label="hasAnimals" name="hasAnimals" value={null} ref={register}>
          <FormControlLabel value="false" control={<Radio />} label="No" />
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
        </RadioGroup>
        {(hasAnimals === "true") ? (
          <>
            <FormLabel component="legend">Puppy was good with Animals?</FormLabel>
            <RadioGroup aria-label="goodWithAnimals" name="goodWithAnimals" value={null} ref={register}>
              <FormControlLabel value="false" control={<Radio />} label="No" />
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
            </RadioGroup>
          </>
        ) : null}

        <FormControl variant="outlined">
          <InputLabel id="nightsStayed">Nights Stated</InputLabel>
          <Select
            labelId="nightsStayed"
            id="nigthsStayer"
            ref={register}
            value={null}
            label="Nights Stayed?"
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7+</MenuItem>
          </Select>
        </FormControl> <br /> */}
        <Button variant="contained" color="primary" type='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default FosterForm;