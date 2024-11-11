import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";

function AddProperty() {
  const [image, setImage] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState({
    propertyType: "residential",
    propertyAdType: "rent",
    propertyAddress: "",
    ownerContact: "",
    propertyAmt: 0,
    additionalInfo: "",
  });

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImage(files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    setPropertyDetails((prevDetails) => ({
      ...prevDetails,
      propertyImages: image,
    }));
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("propertyType", propertyDetails.propertyType);
    formData.append("propertyAdType", propertyDetails.propertyAdType);
    formData.append("propertyAddress", propertyDetails.propertyAddress);
    formData.append("ownerContact", propertyDetails.ownerContact);
    formData.append("propertyAmt", propertyDetails.propertyAmt);
    formData.append("additionalInfo", propertyDetails.additionalInfo);

    if (image) {
      for (let i = 0; i < image.length; i++) {
        formData.append("propertyImages", image[i]);
      }
    }

    axios
      .post("http://localhost:8000/api/owner/postproperty", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding property:", error);
      });
  };

  return (
    <Container
      style={{
        border: "1px solid yellow", // Set border color to yellow
        borderRadius: "5px",
        padding: "30px",
        backgroundColor: "#333333", // Matching background color
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Group as={Col}>
              <Form.Label>Property type</Form.Label>
              <Form.Select
                name="propertyType"
                value={propertyDetails.propertyType}
                onChange={handleChange}
                style={{
                  backgroundColor: "yellow", // Background color set to yellow
                  borderColor: "black", // Black border
                  color: "#333333", // Deep dark text color
                }}
              >
                <option value="choose.." disabled>
                  Choose...
                </option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="land/plot">Land/Plot</option>
              </Form.Select>
            </Form.Group>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Group as={Col}>
              <Form.Label>Property Ad type</Form.Label>
              <Form.Select
                name="propertyAdType"
                value={propertyDetails.propertyAdType}
                onChange={handleChange}
                style={{
                  backgroundColor: "yellow", // Background color set to yellow
                  borderColor: "black", // Black border
                  color: "#333333", // Deep dark text color
                }}
              >
                <option value="choose.." disabled>
                  Choose...
                </option>
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
              </Form.Select>
            </Form.Group>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Property Full Address</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Address"
                aria-describedby="inputGroupPrepend"
                required
                name="propertyAddress"
                value={propertyDetails.propertyAddress}
                onChange={handleChange}
                style={{
                  backgroundColor: "yellow", // Background color set to yellow
                  borderColor: "black", // Black border
                  color: "#333333", // Deep dark text color
                }}
              />
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Property Images</Form.Label>
            <Form.Control
              type="file"
              placeholder="images"
              required
              accept="image/*"
              name="images"
              multiple
              onChange={handleImageChange}
              style={{
                backgroundColor: "yellow", // Background color set to yellow
                borderColor: "black", // Black border
                color: "#333333", // Deep dark text color
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Owner Contact No.</Form.Label>
            <Form.Control
              type="phone"
              placeholder="contact number"
              required
              name="ownerContact"
              value={propertyDetails.ownerContact}
              onChange={handleChange}
              style={{
                backgroundColor: "yellow", // Background color set to yellow
                borderColor: "black", // Black border
                color: "#333333", // Deep dark text color
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Property Amt.</Form.Label>
            <Form.Control
              type="number"
              placeholder="amount"
              required
              name="propertyAmt"
              value={propertyDetails.propertyAmt}
              onChange={handleChange}
              style={{
                backgroundColor: "yellow", // Background color set to yellow
                borderColor: "black", // Black border
                color: "#333333", // Deep dark text color
              }}
            />
          </Form.Group>
          <FloatingLabel
            label="Additional details for the Property"
            className="mt-4"
            style={{
              color: "#333333", // Deep dark text color for the label
            }}
          >
            <Form.Control
              name="additionalInfo"
              value={propertyDetails.additionalInfo}
              onChange={handleChange}
              as="textarea"
              placeholder="Additional details for the Property" // Default placeholder text
              style={{
                backgroundColor: "yellow", // Background color set to yellow
                borderColor: "black", // Black border
                color: "#333333", // Deep dark text color for input text
                padding: "10px", // Optional padding for better UX
              }}
            />
          </FloatingLabel>
        </Row>
        <Button variant="outline-info" className="float-right" type="submit">
          Submit form
        </Button>
      </Form>
    </Container>
  );
}

export default AddProperty;
