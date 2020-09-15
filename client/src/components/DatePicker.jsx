import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export default function DatePicker(props) {
  // The first commit of Material-UI
  // const [dateOfIntake, setDateOfIntake] = React.useState(new Date);
  // const [approxDateOfBirth, setApproxDateOfBirth] = React.useState(new Date);

  // const handleIntakeDateChange = (date) => {
  //   setDateOfIntake(date);
  // }
  // const handleBirthDateChange = (date) => {
  //   setApproxDateOfBirth(date);
  // };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            label="Date of Intake"
            value={props.dateOfIntake}
            onChange={props.handleIntakeDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            label="Birth Date"
            value={props.approxDateOfBirth}
            onChange={props.handleBirthDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </>
  );
}
