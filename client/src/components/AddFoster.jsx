import React, { useState } from 'react';
import { Button, CssBaseline, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import capitalizeName from './CapitalizeName';

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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddFoster(props) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm()
  console.log(props.allFosters) // [{id, foster_name}, {id, foster_name}, {id, foster_name}]
  const onSubmit = (data) => {
    data.foster_name = capitalizeName(data.foster_name)

    //ensure unique foster name
    let isUniqueName = true
    for (var i = 0; i < props.allFosters.length; i++) {
      if (props.allFosters[i].foster_name === data.foster_name) {
        isUniqueName = false;
        break;
      }
    };

    (isUniqueName) ? (
      axios.post('/addFoster', data)
        .then((res) => {
          console.log("from add foster", res)
        })
        .then(() => {
          props.returnHome()
        })
        .catch((err) => {
          console.log('add foster Post err: ', err)
        })
    ) : alert(`${data.foster_name} is already registered as a foster`)
  }

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="foster_name"
            label="New Foster's Name"
            type="text"
          />
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
  )
}
