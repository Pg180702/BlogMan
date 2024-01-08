import React, { useState } from "react";
import { Stack, TextField, Box, Button } from "@mui/material";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/users/register", {
      method: "POST",
      body: JSON.stringify({ name, username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) alert("Registration success");
    else alert("registration failed");
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
          border: "1px solid black",
          borderRadius: "8px",
          padding: 6,
        }}
      >
        {/* <HowToRegRoundedIcon sx={{ marginBottom: 5 }} /> */}
        <div style={{ marginBottom: 20 }}>
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/new-registration-icon.png"
            style={{ width: "64px", height: "64px" }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1}>
              <TextField
                label="Name"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Stack>
            <Stack direction="row">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </Stack>
            <Stack direction="row">
              <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>
            <Stack direction="row">
              <TextField label="Repeat Password" type="password" fullWidth />
            </Stack>
            <Stack direction="row">
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ backgroundColor: "#343a40" }}
              >
                Register
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default Register;
