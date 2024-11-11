import React, { useState } from "react";
import { Button, Container, Nav } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import p1 from "../../images/p1.jpg";
import p2 from "../../images/p2.jpg";
import p3 from "../../images/p3.jpg";
import p4 from "../../images/p4.jpg";
import AllPropertiesCards from "../user/AllPropertiesCards";

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {/* Navbar section for Home page */}
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

      {/* Carousel for image slides */}
      <div className="home-body">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img src={p1} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={p2} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={p3} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={p4} alt="Fourth slide" />
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Property Listings */}
      <div className="property-content">
        <div className="text-center">
          <h1 className="m-1 p-5">All Properties that you may look for</h1>
          <p style={{ fontSize: 15, fontWeight: 800 }}>
            Want to post your Property?{" "}
            <Link to={"/register"}>
              <Button
                variant="outline-info"
                style={{
                  color: "#ffcc00", // Text color
                  borderColor: "#ffcc00", // Border color
                }}
              >
                Register as Owner
              </Button>
            </Link>
          </p>
        </div>

        <Container>
          <AllPropertiesCards />
        </Container>
      </div>
    </>
  );
};

export default Home;
