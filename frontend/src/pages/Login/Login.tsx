import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
} from "@mui/material";
import "./style.css";

export default function Login() {
  return (
    <div className="login">
      <Typography variant="h4" sx={{ mb: 6 }}>
        TenMGrid Account Login
      </Typography>
      <form className="form">
        {/* <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl> */}

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
          sx={{ mb: 4 }}
        />
        <Button fullWidth color="primary" variant="contained" sx={{ mb: 4 }}>
          Login
        </Button>
      </form>
      <Link to="/register" style={{ textDecoration: "none" }}>
        <Button
          style={{
            textTransform: "initial",
            color: "white",
          }}
        >
          Forgot Password
        </Button>
      </Link>
      <Link to="/register" style={{ textDecoration: "none" }}>
        <Button
          style={{
            textTransform: "initial",
            color: "white",
          }}
        >
          Don't have an account?
        </Button>
      </Link>
    </div>
  );
}
