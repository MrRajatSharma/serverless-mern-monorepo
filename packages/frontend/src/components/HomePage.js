import React from 'react';
import Grid from "./Grid";

import tweets from './dataset';

class HomePage extends React.Component {
  
  render() {
    const items = tweets.map((tweet, index) => {
      return (
        <li
          key={`tweet-${tweet.id}`}
          className="grid-item"
          style={{
            width: 200,
            // marginBottom: 20
          }}
        >
          <div>
            <h3>{tweet.user}</h3>
            <em>{tweet.created_at}</em>
            <p>{tweet.title}</p>
          </div>
        </li>
      );
    });

    return (
      <div>
        <Grid >
          {items}
        </Grid>
      </div>
    );
  }
};

export default HomePage;
