import { ButtonBase, Grid, Paper, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import "../index.css";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const HomePosts = ({
  _id,
  title,
  image,
  content,
  author,
  createdAt,
  updatedAt,
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "25px auto auto auto",
        maxWidth: 1000,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Link to={`/mainpost/${_id}`}>
            <ButtonBase
              sx={{
                width: { xs: "100%", sm: "100%" },
                height: { xs: 128, sm: 128 },
              }}
            >
              <Img
                alt="complex"
                src={image}
                sx={{
                  width: { xs: "100%", sm: "100%" },
                  height: { xs: 128, sm: 128 },
                }}
              />
            </ButtonBase>
          </Link>
        </Grid>
        <Grid item xs={12} sm={9} container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h6" fontFamily="Poppins">
                {title}
              </Typography>
              <Typography variant="body2" gutterBottom fontFamily="Poppins">
                {content.substring(0, 300)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontFamily="Poppins"
              >
                {author.name} {createdAt}
              </Typography>
            </Grid>
            <Grid item>
              <Link to={`/editpost/${_id}`}>
                <Typography
                  sx={{ cursor: "pointer" }}
                  variant="body2"
                  fontFamily="Poppins"
                >
                  Edit
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
//make edit changes,navbr me menu,hosting
export default HomePosts;
