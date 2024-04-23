import { Box, Button, Input, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const NewPost = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", selectedFile);
    const response = await fetch(
      "https://blogman-api.onrender.com/posts/create",
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );
    if (response.ok) {
      alert("post created successfully");
      setRedirect(true);
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
            fullWidth
            label="Post Title"
            value={title}
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
            {/* <Button variant="contained" sx={{ backgroundColor: "#343a40" }}>
              Upload
            </Button> */}
          </Stack>
          <TextField
            variant="outlined"
            multiline
            fullWidth
            label="Write Content Here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ fontFamily: "Montserrat" }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#343a40", fontFamily: "Montserrat" }}
            type="submit"
          >
            Create Post
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default NewPost;
