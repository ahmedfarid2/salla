import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      setError("Unable to login. Please try again.");
      return;
    }

    const token = await response.json();

    if (!token) {
      setError("Unable to login. Please try again.");
      return;
    }

    login(email, token);
    navigate("/");
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      ></Box>
      <Typography variant="h6">Login to your Account</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
          border: 1,
          borderColor: "#f5f5f5",
          p: 2,
        }}
      >
        <TextField inputRef={emailRef} label="Email" name="email" />
        <TextField
          inputRef={passwordRef}
          type="password"
          label="Password"
          name="password"
        />
        <Button onClick={onSubmit} variant="contained">
          Login
        </Button>
        {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      </Box>
    </Container>
  );
};

export default LoginPage;
