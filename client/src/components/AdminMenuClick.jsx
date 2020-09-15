import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function AdminMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleAdminMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotoAddFoster = () => {
    handleClose()
    props.toAddFoster()
  }
  const gotoAddPuppy = () => {
    handleClose()
    props.toAddPuppy()
  }


  return (
    <div>
      <Button color="inherit" aria-controls="admin-menu" aria-haspopup="true" onClick={handleAdminMenuClick}>
        Admin
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={gotoAddFoster}>Add Foster</MenuItem>
        <MenuItem onClick={gotoAddPuppy}>Puppy Intake Form</MenuItem>
      </Menu>
    </div>
  );
}
