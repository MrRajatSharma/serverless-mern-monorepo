import React, { useEffect, useState } from 'react';
import PinterestGrid from "./Grid";
import { useQuery, gql } from '@apollo/client';

import BlogPostAdd from "./BlogPostAdd";
import { cloneDeep } from '@apollo/client/utilities';

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

  const renderItem = (tweet) => {
    return <li
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
  }

  const updateItems = (list) => {
    const newItems = list.map((tweet, index) => renderItem(tweet));
    setItems(newItems);
  }

  useEffect(() => {
    console.log("data", data);
    if (data) {
      updateItems(data.list.list);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;


  const getQueryParams = () => {
    return {  }
  }

  return (
    <>
      <h1 style={{ color: "white"}}>Pinterest</h1>
      <BlogPostAdd
        appendTweet={(newTweet) => {
          const cloned = cloneDeep(items);
          const renderedTweet = renderItem(newTweet.createTweet);
          cloned.unshift(renderedTweet);
          setItems(cloned);
        }}
      />
      <PinterestGrid >
        {items}
      </PinterestGrid>
    </>
  );
};

