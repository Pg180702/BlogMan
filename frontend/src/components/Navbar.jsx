import React, { useContext } from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const logout = async () => {
    try {
      await fetch("https://blogman-api.onrender.com/users/logout", {
        credentials: "include",
        method: "POST",
      });
      setUserInfo(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const username = userInfo?.email;
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#343a40" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              BlogMan
            </Link>
          </Typography>
          {username && (
            <>
              <Link to="/newpost">
                <Button style={{ color: "white" }}>Create New Post</Button>
              </Link>
              <Button style={{ color: "white" }} onClick={logout}>
                Logout
              </Button>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">
                <Button style={{ color: "white" }}>Login</Button>
              </Link>
              <Link to="/register">
                <Button style={{ color: "white" }}>Register</Button>
              </Link>
              <Link to="/newpost">
                <Button style={{ color: "white" }}>Create Post</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
