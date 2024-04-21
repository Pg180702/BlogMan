import { Box, Button, Input, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/editpost/${id}`).then((response) => {
      response.json().then((data) => {
        //setData(data);
        setTitle(data.title);
        setContent(data.content);
      });
    });
  }, []);
  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    //formData.append("image", selectedFile);
    formData.append("id", id);
    if (selectedFile != null) formData.append("image", selectedFile);
    const response = await fetch(
      "https://blogman-api.onrender.com/posts/updatePost",
      {
        method: "PUT",
        body: formData,
        credentials: "include",
      }
    );
    if (response.ok) {
      alert("post updated successfully");
      setRedirect(true);
    } //else if (response.status === 400) alert("you are not the author");
    else {
      alert("you are not the author");
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 12,
      }}
    >
      <form style={{ width: "80%" }} onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <TextField
            variant="outlined"
            fullWidth={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ fontFamily: "Montserrat" }}
          />
          <Stack direction="row" spacing={1}>
            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              fullWidth // Specify accepted file types (images in this case)
              onChange={handleImageChange}
            />
          </Stack>
          <TextField
            variant="outlined"
            multiline
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ fontFamily: "Montserrat" }}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ backgroundColor: "#343a40" }}
            fontFamily="Montserrat"
          >
            Update Post
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EditPost;
