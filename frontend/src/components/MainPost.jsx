import React, { useContext, useEffect, useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { UserContext } from "./UserContext";
import { Link, useParams } from "react-router-dom";
const MainPost = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/posts/mainpost/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);
  if (!postInfo) return "";
  return (
    <Box sx={{ margin: "25px auto auto auto" }}>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", margin: "10px 0 5px" }}
        fontFamily="Montserrat"
      >
        {postInfo.title}
      </Typography>
      <Box
        sx={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
        fontFamily="Montserrat"
      >
        {postInfo.author.name}
      </Box>
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Link to={`/editpost/${id}`}>
          <Button
            sx={{
              backgroundColor: "#333",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              color: "#fff",
              padding: "15px 30px",
              borderRadius: 5,
              textDecoration: "none",
            }}
            fontFamily="Montserrat"
          >
            Edit Me
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          maxHeight: "300px",
          overflow: "hidden",
          margin: "50px 30px",
        }}
      >
        <img
          src={postInfo.image}
          style={{
            objectFit: "cover",
            objectPosition: "center center",
            width: "100%",
          }}
        />
      </Box>
      <Box
        sx={{ lineHeight: "1.7rem", margin: "50px 20px" }}
        fontFamily="Montserrat"
      >
        {postInfo.content}
      </Box>
    </Box>
  );
};

export default MainPost;
