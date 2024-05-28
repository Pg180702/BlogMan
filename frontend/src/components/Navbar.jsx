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
      sessionStorage.removeItem("token");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const username = userInfo?.email;
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#343a40" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: "1rem", fontWeight: "bold" }}
          >
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1.2rem",
              }}
            >
              BlogMan
            </Link>
          </Typography>
          {username && (
            <>
              <Link to="/newpost">
                <Button style={{ color: "white", fontSize: "0.9rem" }}>
                  Create New Post
                </Button>
              </Link>
              <Button
                style={{ color: "white", fontSize: "0.9rem" }}
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">
                <Button style={{ color: "white", fontSize: "0.9rem" }}>
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button style={{ color: "white", fontSize: "0.9rem" }}>
                  Register
                </Button>
              </Link>
              <Link to="/newpost">
                <Button style={{ color: "white", fontSize: "0.9rem" }}>
                  Create Post
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
