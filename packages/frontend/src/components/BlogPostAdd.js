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
    id,
    user,
    title,
    createdAt
  } 
}`

export default () => {
  let title, user, body;
  const [addTweet, { data }] = useMutation(CREATE_TWEET);

  return (
    <form
      className="pinterest-form"
      onSubmit={e => {
        e.preventDefault();
        addTweet({variables: {
          title: title.value,
          user: user.value,
          body: body.value
        }});
        input.value = '';
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
          <Button size="small" className="pinterest-form__button">Save</Button>
        </Grid>
      </Grid>
    </form>
  )
}