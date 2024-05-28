import React, { useEffect, useState } from "react";
import HomePosts from "./HomePosts";
import ClipLoader from "react-spinners/ClipLoader";
const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://blogman-api.onrender.com/posts/allposts")
      .then((response) => {
        response.json().then((posts) => {
          setPosts(posts);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40vh",
          }}
        >
          <ClipLoader size={30} color={"black"} loading={true} />
        </div>
      ) : (
        posts.map((post) => <HomePosts {...post} />)
      )}
    </>
  );
};

export default MainPage;
