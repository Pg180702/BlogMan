import React, { useContext, useState } from "react";
import { Stack, TextField, Box, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://blogman-api.onrender.com/users/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        sessionStorage.setItem("token", userInfo.token);
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 12,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 12,
          border: "1px solid black",
          borderRadius: "8px",
          padding: 6,
        }}
      >
        {/* <HowToRegRoundedIcon sx={{ marginBottom: 5 }} /> */}
        <div style={{ marginBottom: 20 }}>
          <img
            src="https://as1.ftcdn.net/v2/jpg/04/23/62/52/1000_F_423625263_o6UWGjUchM3fyaKeGpT3842F386EH6Av.jpg"
            style={{ width: "64px", height: "64px" }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Stack direction="row">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Stack>
            <Stack direction="row">
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                fullWidth
              />
            </Stack>
            <Stack direction="row">
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{ backgroundColor: "#343a40" }}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default Login;
