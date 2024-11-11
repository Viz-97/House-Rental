import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      data.email === "" ||
      data.password === "" ||
      data.confirmPassword === ""
    ) {
      alert("Please fill all fields");
    } else {
      if (data.password === data.confirmPassword) {
        await axios
          .post("http://localhost:8000/api/user/forgotpassword", data)
          .then((res) => {
            if (res.data.success) {
              alert("Your password has been changed!");
              navigate("/login");
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            if (err.response && err.response.status === 401) {
              alert("User doesn't exist");
            }
            navigate("/register");
          });
      }
    }
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-custom">
        <Container fluid>
          <Navbar.Brand>
            <Link to={"/"}>Neel Rentals</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Nav>
              <Link to={"/"}>Home</Link>
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#333333", // Dark background to match the page
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            style={{ color: "#ffcc00" }} // Yellow text color
          >
            Forgot Password?
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
              InputProps={{
                style: {
                  backgroundColor: "#333333", // Background color of input fields
                  borderColor: "#ffcc00", // Border color
                  color: "#ffcc00", // Text color inside the input box
                },
              }}
              InputLabelProps={{
                style: { color: "#ffcc00" }, // Label text color
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              value={data.password}
              onChange={handleChange}
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                style: {
                  backgroundColor: "#333333", // Background color of input fields
                  borderColor: "#ffcc00", // Border color
                  color: "#ffcc00", // Text color inside the input box
                },
              }}
              InputLabelProps={{
                style: { color: "#ffcc00" }, // Label text color
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              InputProps={{
                style: {
                  backgroundColor: "#333333", // Background color of input fields
                  borderColor: "#ffcc00", // Border color
                  color: "#ffcc00", // Text color inside the input box
                },
              }}
              InputLabelProps={{
                style: { color: "#ffcc00" }, // Label text color
              }}
            />
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  width: "200px",
                  backgroundColor: "#ffcc00", // Button background color
                  color: "#333333", // Button text color
                }}
              >
                Change Password
              </Button>
            </Box>
            <Grid container>
              <Grid item></Grid>
              <Grid item>
                Don't have an account?
                <Link
                  style={{ color: "#ffcc00" }}
                  to={"/register"}
                  variant="body2"
                >
                  {" Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ForgotPassword;
