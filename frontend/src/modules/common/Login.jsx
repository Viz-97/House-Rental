import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data?.email || !data?.password) {
      return alert("Please fill all fields");
    } else {
      axios
        .post("http://localhost:8000/api/user/login", data)
        .then((res) => {
          if (res.data.success) {
            message.success(res.data.message);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            const isLoggedIn = JSON.parse(localStorage.getItem("user"));

            switch (isLoggedIn.type) {
              case "Admin":
                navigate("/adminhome");
                break;
              case "Renter":
                navigate("/renterhome");
                break;
              case "Owner":
                if (isLoggedIn.granted === "ungranted") {
                  message.error(
                    "Your account is not yet confirmed by the admin"
                  );
                } else {
                  navigate("/ownerhome");
                }
                break;
              default:
                navigate("/login");
                break;
            }
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            alert("User doesn't exist");
          }
          navigate("/login");
        });
    }
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-custom">
        <Container fluid>
          <Navbar.Brand>
            <h2>Neel Rentals</h2>
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

      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
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
                style: { color: "#ffcc00" }, // Text color inside the box
              }}
              InputLabelProps={{
                style: { color: "#ffcc00" }, // Label color
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ffcc00", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffcc00", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffcc00", // Border color when focused
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              value={data.password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                style: { color: "#ffcc00" }, // Text color inside the box
              }}
              InputLabelProps={{
                style: { color: "#ffcc00" }, // Label color
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ffcc00", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffcc00", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffcc00", // Border color when focused
                  },
                },
              }}
            />
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                style={{ width: "200px" }}
              >
                Sign Up
              </Button>
            </Box>
            <Grid container>
              <Grid item>
                forgot password?
                <Link
                  style={{ color: "red" }}
                  to={"/forgotpassword"}
                  variant="body2"
                >
                  {" Click here"}
                </Link>
              </Grid>
              <Grid item>
                Have an account?
                <Link
                  style={{ color: "blue" }}
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

export default Login;
