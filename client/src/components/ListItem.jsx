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
  const { images, puppy_id, gender, potentialBreed, approxDateOfBirth, adoptionFee, snDeposit, dateOfIntake, nightsStayed, haveKids, goodWithKids, haveAnimals, goodWithAnimals, activityLevel, disposition, description, color, coat, tail } = props.item;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction="column" justify="center" alignItems="stretch">
          <Grid container item xs={12} alignItems='flex-start' justify='flex-start'>
            <Grid item style={{ marginRight: '30px' }}>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt='puppy' src={images[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRM8go7139mdYP-0j6U1AmiaFzNkFNLSzsOxp19KndCXXkNWFxpojI3YoaAdSlOzFl9e6RYqSHWPnz_25n3BV1sFqqa984Mu-HNqQ&usqp=CAU&ec=45699845"} />
              </ButtonBase>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="subtitle1" style={{ marginRight: '30px' }}>
                <b>Puppy ID: {puppy_id} <br />
                  Adoption Fee: ${adoptionFee} + ${snDeposit} spay/neuter deposit</b>
              </Typography>
              <>
                {(dateOfIntake) ? (
                  <Typography variant="body2" gutterBottom>
                    Intake date: {dateOfIntake} <br />
                  </Typography>) : null}
                {(approxDateOfBirth) ? (
                  <Typography variant="body2" gutterBottom>
                    Date of birth: {approxDateOfBirth} <br />
                  </Typography>) : null}
                {(Array.isArray(potentialBreed)) ? (
                  <Typography variant="body2" gutterBottom>
                    Possible Breed: {potentialBreed.join('/ ')} <br />
                  </Typography>) : null}
                {(gender) ? (
                  <Typography variant="body2" gutterBottom>
                    Gender: {gender} <br />
                  </Typography>) : null}
              </>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <b>The Foster</b>
              </Typography>
              <Typography variant="body2">
                Fostered for {nightsStayed} nights <br />
                Has kids under 10 years old? {haveKids ? 'Yes' : 'No'} <br />
                {haveKids ? <> Puppy {goodWithKids ? 'is' : 'is not'} good with kids <br /></> : null}
                Has other animals? {haveAnimals ? 'Yes' : 'No'} <br />
                {haveAnimals ? <> Puppy {goodWithAnimals ? 'is' : 'is not'} good with animals <br /></> : null} <br />
              </Typography>
              <Typography variant="subtitle1">
                <b>The Puppy</b>
              </Typography>
              <Typography variant="body2" gutterBottom>
                {(color.length !== 0) ? (
                  <Typography variant="body2" gutterBottom>
                    Color: ${color.join('/ ')} <br />
                  </Typography>
                ) : null}
                {(coat) ? (
                  <Typography variant="body2" gutterBottom>
                    Coat: {coat} <br />
                  </Typography>
                ) : null}
                {(tail) ? (
                  <Typography variant="body2" gutterBottom>
                    Tail: {tail} <br />
                  </Typography>
                ) : null}
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
