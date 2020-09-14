import React, { useState } from 'react';
import { Container, Avatar, Button, CssBaseline, TextField, FormControlLabel, Radio, RadioGroup, FormLabel, Checkbox, Link, Grid, Typography, FormGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PetsIcon from '@material-ui/icons/Pets';
import { useForm } from 'react-hook-form';
import StyledRadio from './StyledRadio';

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

export default function SelectFoster(props) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm()

  return (
    <>
      <FormLabel>Foster Name?  </FormLabel>
      <select defaultValue='' name="foster_name" ref={register}>
        {props.allFosters.map((el) => {
          return <option value={el.foster_name} key={el.foster_name} >{el.foster_name}</option>

        })}
      </select>
    </>
  )
}