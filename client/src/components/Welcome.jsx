import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AdminMenu from './AdminMenuClick';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function WelcomeBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Puppy Rescue: From Forster to Adopted
          </Typography>
          <Button color="inherit" onClick={props.toFosterForm}>Foster</Button>
          <AdminMenu toAddFoster={props.toAddFoster} toAddPuppy={props.toAddPuppy} />
        </Toolbar>
      </AppBar>

      <Typography variant="h3" gutterBottom align='center'>
        Puppies Available for Adoption
      </Typography>
      <Typography variant="h5" gutterBottom color='primary' align='center'>
        Our next event will be: <br />
        Saturday September 19th starting at 9:00 AM
      </Typography>
    </div>
  );
}