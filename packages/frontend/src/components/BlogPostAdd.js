import React, { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export const CREATE_TWEET = gql`
mutation CreateTweetMutation (
  $title: String!
  $user: String!
  $body: String!
) {
  createTweet (
    title: $title
    user: $user
    body: $body
  ) {
    user,
    id,
    title,
    createdAt
  } 
}`

export default ({ appendTweet }) => {
  let title, user, body;
  const [addTweet, { data }] = useMutation(CREATE_TWEET);

  console.log(data);

  useEffect(() => {
    if (data) {
      console.log(data);
      appendTweet(data);
    }
  }, [data])

  return (
    <form
      className="pinterest-form"
      onSubmit={e => {
        e.preventDefault();
        console.log("submit called", title.value, user.value, body.value);

        addTweet({variables: {
          title: title.value,
          user: user.value,
          body: body.value
        }});
        
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md="3">
          <input
            required
            ref={node => {
              title = node;
            }}
            placeholder="Title"
            className="pinterest-form__field" />
        </Grid>
        <Grid item xs={12} md="3">
          <input
            required
            ref={node => {
              user = node;
            }}
            placeholder="Author"
            className="pinterest-form__field" />
        </Grid>

        <Grid item xs={12} md="3">
          <input
            required
            ref={node => {
              body = node;
            }}
            placeholder="Body"
            className="pinterest-form__field"
          />
        </Grid>
        <Grid item xs={12} md="3">
          <Button size="small" type="submit" className="pinterest-form__button">Save</Button>
        </Grid>
      </Grid>
    </form>
  )
}