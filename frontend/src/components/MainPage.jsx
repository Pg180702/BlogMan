import React, { useEffect, useState } from "react";
import HomePosts from "./HomePosts";
import ClipLoader from "react-spinners/ClipLoader";
const MainPage = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 8000);
  }, []);
  useEffect(() => {
    fetch("https://blogman-api.onrender.com/posts/allposts").then(
      (response) => {
        response.json().then((posts) => {
          setPosts(posts);
        });
      }
    );
  }, []);
  return (
    <>
      {loading ? (
        <ClipLoader size={30} color={"black"} loading={loading} />
      ) : (
        posts.length > 0 && posts.map((post) => <HomePosts {...post} />)
      )}
    </>
  );
};

export default MainPage;
