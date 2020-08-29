import React, { useEffect, useState } from 'react';
import PinterestGrid from "./Grid";
import { useQuery, gql } from '@apollo/client';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';

export const LIST_QUERY = gql`
  query tweets {
    list {
      count,
      lastEvaluatedKey,
      scannedCount,
      list {
        id,
        user,
        title,
        createdAt
      }
  	}
  }
`

export default () => {
  const { loading, error, data } = useQuery(LIST_QUERY);
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("data", data);
    if (data) {
      const newItems = data.list.list.map((tweet, index) => (
        <li
          key={`tweet-${tweet.id}`}
          className="grid-item"
          style={{
            width: 200,
            // marginBottom: 20
          }}
        >
          <div>
            <h3>{tweet.id}</h3>
            <h3>{tweet.user}</h3>
            {/* <em>{tweet.createdAt}</em> */}
            <p>{tweet.title}</p>
          </div>
        </li>
      ));
      setItems(newItems);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;


  const getQueryParams = () => {
    return {  }
  }

  return (
    <>
    
    <div className="pinterest-form">
    <Grid container spacing={2}>
      <Grid item xs={12} md="3">
        <input required label="Title" className="pinterest-form__field" />
      </Grid>
      <Grid item xs={12} md="3">
        <input required label="Author" className="pinterest-form__field" />
      </Grid>

      <Grid item xs={12} md="3">
        <input required label="Body" className="pinterest-form__field" />
      </Grid>
      <Grid item xs={12} md="3">
        <Button size="small" className="pinterest-form__button">Save</Button>
      </Grid>
    </Grid>
    </div>
    <PinterestGrid >
      {items}
    </PinterestGrid>
    <Fab 
      size="medium"
      color="primary"
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
      }}
    />
    </>
  );
};

