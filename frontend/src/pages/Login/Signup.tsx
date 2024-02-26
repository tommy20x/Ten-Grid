import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import "./style.css";

export default function Signup() {
  return (
    <div className="login">
      <Typography variant="h4" sx={{ mb: 6 }}>
        Create Your Account
      </Typography>
      <form className="form">
        <TextField
          fullWidth
          id="username"
          label="Username"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          id="email"
          label="Email"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          id="password_confirm"
          label="Confirm Password"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          color="primary"
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          SIGN UP
        </Button>
      </form>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button
          style={{
            textTransform: "initial",
            color: "white",
          }}
        >
          You have already account? Login
        </Button>
      </Link>
    </div>
  );
}
