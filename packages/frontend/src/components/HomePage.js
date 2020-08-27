import React, { useEffect, useState } from 'react';
import Grid from "./Grid";
import { useQuery, gql } from '@apollo/client';


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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  useEffect(() => {
    console.log("data", data);
    if (data) {
      const items = data && data.list.list.map((tweet, index) => {
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
              <h3>{tweet.id}</h3>
              <h3>{tweet.user}</h3>
              {/* <em>{tweet.createdAt}</em> */}
              <p>{tweet.title}</p>
            </div>
          </li>
        );
      });
      setItems(items);
    }
  }, [data]);

  const getQueryParams = () => {
    return {  }
  }

  return (
    <Grid >
      {items}
    </Grid>
  );
};

