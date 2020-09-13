import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    variant: 'outlined',
    margin: 'auto',
    color: theme.palette.text.secondary,
  },
  image: {
    width: 256,
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    alignItems: 'center'
  },
}));

const ListItem = (props) => {
  const classes = useStyles();
  const { images, puppy_id, gender, potentialBreed, approxDateOfBirth, adoptionFee, snDeposit, dateOfIntake, nightsStayed, haveKids, haveAnimals, activityLevel, disposition, description, color, coat, tail } = props.item;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction="column" justify="center" alignItems="stretch">
          <Grid container item xs={12} alignItems='flex-start' justify='flex-start'>
            <Grid item style={{ marginRight: '30px' }}>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt='puppy' src={images[0]} />
              </ButtonBase>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="subtitle1" style={{ marginRight: '30px' }}>
                <b>Puppy ID: {puppy_id} <br />
                  Adoption Fee: ${adoptionFee} + ${snDeposit} spay/neuter deposit</b>
              </Typography>
              <Typography variant="body2" gutterBottom>
                {(dateOfIntake) ? (
                  <Typography variant="body2" gutterBottom>
                    Intake date: {dateOfIntake} <br />
                  </Typography>) : null }
                {(approxDateOfBirth) ? (
                  <Typography variant="body2" gutterBottom>
                    Date of birth: {approxDateOfBirth} <br />
                  </Typography>) : null }
                {(potentialBreed) ? (
                  <Typography variant="body2" gutterBottom>
                    Possible Breed: {potentialBreed.join('/ ')} <br />
                  </Typography>) : null }
                {(gender) ? (
                  <Typography variant="body2" gutterBottom>
                    Gender: {gender} <br />
                  </Typography>) : null }
                {(approxDateOfBirth) ? (
                  <Typography variant="body2" gutterBottom>
                    Date of Birth: {approxDateOfBirth} <br />
                  </Typography>) : null }
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <b>The Foster</b>
              </Typography>
              <Typography variant="body2">
                Fostered for {nightsStayed} nights <br />
                Have kids under10? {haveKids ? 'Yes' : 'No'} <br />
                Have other animals? {haveAnimals ? 'Yes' : 'No'} <br />
              </Typography>
              <Typography variant="subtitle1">
                <b>The Puppy</b>
              </Typography>
              <Typography variant="body2" gutterBottom>
                Color: {color} <br />
                Coat: {coat} <br />
                Tail: {tail}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems='flex-start' justify='flex-start'>
            <Typography gutterBottom variant="subtitle1" style={{ marginRight: '30px' }}>
              <b>Disposition: </b>{disposition.join('/ ')} <br />
              <b>Activity Level: </b>{activityLevel}
            </Typography>
          </Grid>
          <Grid container item xs={12} alignItems='flex-start' justify='flex-start'>
            <Typography gutterBottom variant="subtitle1" style={{ marginRight: '30px' }}>
              <b>Notes from the foster: </b>{description}
            </Typography>
          </Grid>
          <Grid container item xs={12} alignItems='flex-start' justify='flex-start'>
            {images.map((image, index) => <img className={classes.img} alt='puppy' width={128} key={index} src={image} style={{ marginRight: '30px' }} />)}
          </Grid>

        </Grid>
      </Paper>
    </div>

  )
}

export default ListItem;
