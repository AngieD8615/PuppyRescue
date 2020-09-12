import React from 'react';
import ListItem from './ListItem.jsx';
import Grid from '@material-ui/core/Grid';


const List = (props) => {
  return (
    <div>
      <Grid container>
        <Grid item sm={2} />
          <Grid item xs={12} sm={8}> 
            {props.puppyInfo.map(item => <ListItem item={item} key={item.puppy_id}/>)}
          </Grid>
        <Grid item sm={2} />
      </Grid>
    </div>
  )
}

export default List;