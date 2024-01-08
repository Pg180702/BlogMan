import React, { useEffect, useState } from "react";
import HomePosts from "./HomePosts";

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/posts/allposts").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>{posts.length > 0 && posts.map((post) => <HomePosts {...post} />)}</>
  );
};

export default MainPage;
