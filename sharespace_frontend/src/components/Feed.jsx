import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery, searchQuery } from "../utils/data";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const [pins, setPins] = useState();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const searchQ = searchQuery(categoryId);
      client.fetch(searchQ).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      const feedQ = feedQuery;
      client.fetch(feedQ).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  const ideaName = categoryId || 'new';
  if (loading) {
    return (<Spinner message={`We are adding ${ideaName} ideas to your feed!`} />)
  }
  return <div>{pins && <MasonryLayout pins={pins}/>}</div>;
};

export default Feed;
