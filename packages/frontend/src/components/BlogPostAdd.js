import React, { useEffect, useState } from 'react';
import PinterestGrid from "./Grid";
import { useQuery, gql } from '@apollo/client';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';


export default () => {
  return (
    <div className="pinterest-form">
      <Grid container spacing={2}>
        <Grid item xs={12} md="3">
          <input required label="Title" placeholder="Title" className="pinterest-form__field" />
        </Grid>
        <Grid item xs={12} md="3">
          <input required label="Author"  placeholder="Author" className="pinterest-form__field" />
        </Grid>

        <Grid item xs={12} md="3">
          <input required label="Body"  placeholder="Body" className="pinterest-form__field" />
        </Grid>
        <Grid item xs={12} md="3">
          <Button size="small" className="pinterest-form__button">Save</Button>
        </Grid>
      </Grid>
    </div>
  )
}