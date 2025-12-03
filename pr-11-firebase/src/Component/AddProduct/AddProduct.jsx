import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  addproductAsync } from "../Services/Action/AddProductAction";
import generateUniqueId from "generate-unique-id";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigat = useNavigate()
  const {isLoding,isCreated,errMSG} = useSelector((state)=>state)
  const initialState = {
    title: "",
    category: "",
    subcategory: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
    image: ["", "", "", ""],
    rates: {
      rating: "",
      rests: "",
    },
  };

  const [inputform, setinputform] = useState(initialState);
  const [inputErr, setinputErr] = useState({});

  // Handle all input changes
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name === "image" && index !== null) {
      const newImages = [...inputform.image];
      newImages[index] = value;
      setinputform({ ...inputform, image: newImages });
    } else if (name === "rating" || name === "rests") {
      setinputform({
        ...inputform,
        rates: { ...inputform.rates, [name]: value },
      });
    } else {
      setinputform({ ...inputform, [name]: value });
    }
  };

  const handleErrors = () => {
    const errors = {};

    if (!inputform.title.trim()) errors.titleErr = "Enter Product Name";
    if (!inputform.category) errors.categoryErr = "Please select category";
    if (!inputform.subcategory) errors.subcategoryErr = "Please select subcategory";
    if (!inputform.brand) errors.brandErr = "Please select brand";
    if (!inputform.price || inputform.price <= 0) errors.priceErr = "Enter valid price";
    if (!inputform.discount || inputform.discount < 0)
      errors.discountErr = "Enter valid discount";
    if (!inputform.stock || inputform.stock <= 0) errors.stockErr = "Enter Stock";
    if (inputform.image.some((img) => !img.trim()))
      errors.imageErr = "Provide all Image URLs";
    if (!inputform.description.trim()) errors.descriptionErr = "Describe the Product";
    if (!inputform.rates.rating) errors.ratingErr = "Enter Rating";
    if (!inputform.rates.rests) errors.restsErr = "Enter Number of Reviews";

    setinputErr(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (handleErrors()) {
      inputform.id =
        "PR" +
        generateUniqueId({
          length: 10,
          useLetters: false,
        });

      dispatch(addproductAsync(inputform));
      
    }
  };

  useEffect(()=>{
  if(isCreated){
   if(inputform.category ==="man"){
    setinputform(initialState)
    navigat('/men')
   }else if(inputform.category ==="women"){
     setinputform(initialState)
    navigat('/women')
   } else{
    setinputform(initialState)
    navigat('/kids')
   }
  }
  },[isCreated])

  // Brand selection based on category
  const getBrandOptions = () => {
    switch (inputform.category) {
      case "men":
        return ["Louis Philippe", "Allen Solly", "Park Avenue", "Peter England"];
      case "women":
        return ["Zara", "H&M", "Forever 21"];
      case "kids":
        return ["Gap Kids", "Carter's", "Mini Club"];
      default:
        return [];
    }
  };

  const getsubCatagory = () => {
    switch (inputform.category) {
      case "men":
        return ["Jeans", "T-Shirt", "Kurta"];
      case "women":
        return ["Top", "Leggings", "Saree"];
      case "kids":
        return ["Shirt", "Shorts", "Frock"];
      default:
        return [];
    }
  };

 return (
  <Container
    fluid
    className="d-flex justify-content-center align-items-start py-5"
    style={{ background: "#eef1f6", minHeight: "100vh" }}
  >
    <Row className="justify-content-center w-100">
      <Col md={10} lg={7}>
        <Card
          className="shadow border-0 rounded-4 p-3"
          style={{
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Card.Body>
            {/* PAGE HEADER */}
            <div className="text-center mb-4">
              <h2 className="fw-bold" style={{ color: "#2b4eff" }}>
                Add New Product
              </h2>
              <p className="text-secondary">
                Fill all required fields to add a new product
              </p>
              {errMSG && (
                <div className="text-danger fw-semibold mt-2">{errMSG}</div>
              )}
            </div>

            <Form onSubmit={handleSubmit}>
              {/* ----------- SECTION: BASIC INFO ----------- */}
              <h5 className="fw-bold mb-3 text-secondary">Basic Details</h5>
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={inputform.title}
                      onChange={handleChange}
                      className="rounded-3 shadow-sm"
                      placeholder="Product Title"
                    />
                    {inputErr.titleErr && (
                      <small className="text-danger">{inputErr.titleErr}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={inputform.category}
                      className="rounded-3 shadow-sm"
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="kids">Kids</option>
                    </Form.Select>
                    {inputErr.categoryErr && (
                      <small className="text-danger">{inputErr.categoryErr}</small>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              {/* ----------- SECTION: CATEGORY OPTIONS ----------- */}
              {inputform.category && (
                <>
                  <h5 className="fw-bold mb-3 text-secondary">Product Category</h5>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">Subcategory</Form.Label>
                        <Form.Select
                          name="subcategory"
                          className="rounded-3 shadow-sm"
                          value={inputform.subcategory}
                          onChange={handleChange}
                        >
                          <option value="">Select Subcategory</option>
                          {getsubCatagory().map((cat, idx) => (
                            <option key={idx} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </Form.Select>
                        {inputErr.subcategoryErr && (
                          <small className="text-danger">{inputErr.subcategoryErr}</small>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">Brand</Form.Label>
                        <Form.Select
                          name="brand"
                          className="rounded-3 shadow-sm"
                          value={inputform.brand}
                          onChange={handleChange}
                        >
                          <option value="">Select Brand</option>
                          {getBrandOptions().map((brand, idx) => (
                            <option key={idx} value={brand}>
                              {brand}
                            </option>
                          ))}
                        </Form.Select>
                        {inputErr.brandErr && (
                          <small className="text-danger">{inputErr.brandErr}</small>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              )}

              {/* ----------- SECTION: PRICE & STOCK ----------- */}
              <h5 className="fw-bold mb-3 text-secondary">Pricing & Stock</h5>
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      className="rounded-3 shadow-sm"
                      value={inputform.price}
                      onChange={handleChange}
                      placeholder="₹ Price"
                    />
                    {inputErr.priceErr && (
                      <small className="text-danger">{inputErr.priceErr}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Stock</Form.Label>
                    <Form.Control
                      type="number"
                      name="stock"
                      className="rounded-3 shadow-sm"
                      value={inputform.stock}
                      onChange={handleChange}
                      placeholder="Total Stock"
                    />
                    {inputErr.stockErr && (
                      <small className="text-danger">{inputErr.stockErr}</small>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              {/* ----------- SECTION: DISCOUNT ----------- */}
              <Row className="mb-4">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Discount (%)</Form.Label>
                    <Form.Control
                      type="number"
                      name="discount"
                      className="rounded-3 shadow-sm"
                      value={inputform.discount}
                      onChange={handleChange}
                      placeholder="Enter discount percentage"
                    />
                    {inputErr.discountErr && (
                      <small className="text-danger">{inputErr.discountErr}</small>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              {/* ----------- SECTION: IMAGES ----------- */}
              <h5 className="fw-bold mb-3 text-secondary">Product Images</h5>
              <Row className="mb-4">
                {inputform.image.map((img, i) => (
                  <Col md={6} key={i}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">{`Image ${i + 1}`}</Form.Label>
                      <Form.Control
                        type="text"
                        name="image"
                        value={img}
                        className="rounded-3 shadow-sm"
                        onChange={(e) => handleChange(e, i)}
                        placeholder="Image URL"
                      />
                    </Form.Group>
                  </Col>
                ))}
                {inputErr.imageErr && (
                  <Col md={12}>
                    <small className="text-danger">{inputErr.imageErr}</small>
                  </Col>
                )}
              </Row>

              {/* ----------- SECTION: RATING ----------- */}
              <h5 className="fw-bold mb-3 text-secondary">Ratings</h5>
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Rating</Form.Label>
                    <Form.Control
                      type="number"
                      name="rating"
                      value={inputform.rates.rating}
                      className="rounded-3 shadow-sm"
                      onChange={handleChange}
                      placeholder="1 - 5"
                    />
                    {inputErr.ratingErr && (
                      <small className="text-danger">{inputErr.ratingErr}</small>
                    )}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Reviews</Form.Label>
                    <Form.Control
                      type="number"
                      name="rests"
                      value={inputform.rates.rests}
                      className="rounded-3 shadow-sm"
                      onChange={handleChange}
                      placeholder="Number of reviews"
                    />
                    {inputErr.restsErr && (
                      <small className="text-danger">{inputErr.restsErr}</small>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              {/* ----------- SECTION: DESCRIPTION ----------- */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  className="rounded-3 shadow-sm"
                  name="description"
                  value={inputform.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write product description"
                />
                {inputErr.descriptionErr && (
                  <small className="text-danger">{inputErr.descriptionErr}</small>
                )}
              </Form.Group>

              {/* SUBMIT BUTTON */}
              <div className="text-center mt-3">
                <Button
                  type="submit"
                  className="px-5 py-2 rounded-4 fw-semibold"
                  style={{
                    backgroundColor: "#2b4eff",
                    border: "none",
                    fontSize: "17px",
                  }}
                >
                  {isLoding ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Add Product"
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
};

export default AddProduct;
