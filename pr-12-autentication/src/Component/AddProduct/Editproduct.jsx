import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editproductAsync,
  updateProductAsync,
} from "../Services/Action/addProductAction";
import { ImageUpload } from "../Services/FileUpload/imageupload";

const EditProduct = () => {
  const { product, isLoding, isUpdate } = useSelector(
    (state) => state.AddProductRedux
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigat = useNavigate();
  const naviget = useNavigate();
  const initialState = {
    title: "",
    category: "",
    subcategory: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
    image: [],
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
    if (!inputform.subcategory)
      errors.subcategoryErr = "Please select subcategory";
    if (!inputform.brand) errors.brandErr = "Please select brand";
    if (!inputform.price || inputform.price <= 0)
      errors.priceErr = "Enter valid price";
    if (!inputform.discount || inputform.discount < 0)
      errors.discountErr = "Enter valid discount";
    if (!inputform.stock || inputform.stock <= 0)
      errors.stockErr = "Enter Stock";
    if (inputform.image.some((img) => !img.trim()))
      errors.imageErr = "Provide all Image URLs";
    if (!inputform.description.trim())
      errors.descriptionErr = "Describe the Product";
    if (!inputform.rates.rating) errors.ratingErr = "Enter Rating";
    if (!inputform.rates.rests) errors.restsErr = "Enter Number of Reviews";

    setinputErr(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProductAsync(inputform));
  };

  useEffect(() => {
    if (isUpdate) {
      if (inputform.category == "men") {
        setinputform(initialState);
        naviget("/man");
      } else if (inputform.category == "women") {
        setinputform(initialState);
        naviget("/women");
      } else if (inputform.category == "kids") {
        setinputform(initialState);
        naviget("/kids");
      }
    }
  }, [isUpdate]);

  // Brand selection based on category
  const getBrandOptions = () => {
    switch (inputform.category) {
      case "men":
        return [
          "Louis Philippe",
          "Allen Solly",
          "Park Avenue",
          "Peter England",
        ];
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

  const handalDeletimage = (index) => {
    let img = inputform.image.filter((ele, inde) => {
      return inde !== index;
    });

    setinputform({
      ...inputform,
      image: [...img],
    });
  };


  const handalImage = async (e) => {
      let files = [...e.target.files];
      let urls = await Promise.all(files.map((file) => ImageUpload(file)));
  
      setinputform({
        ...inputform,
        image: [...inputform.image, ...urls],
      });
  
    };

  useEffect(() => {
    if (product) {
      setinputform(product);
    }
  }, [product]);

  useEffect(() => {
    dispatch(editproductAsync(id));
  }, [id]);
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center py-5"
      style={{ backgroundColor: "#eef1f6", minHeight: "100vh" }}
    >
      {isLoding ? (
        <div className="d-flex flex-column align-items-center">
          <Spinner animation="border" variant="primary" />
          <span className="mt-2 fw-semibold text-primary">Loading...</span>
        </div>
      ) : (
        <Row className="justify-content-center w-100">
          <Col md={8} lg={6}>
            <Card
              className="shadow border-0 rounded-4 p-2"
              style={{
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.85)",
              }}
            >
              <Card.Body className="p-4">
                <h3 className="text-center mb-4 fw-bold text-primary">
                  Edit Product
                </h3>

                <Form onSubmit={handleSubmit}>
                  {/* TITLE + CATEGORY */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Title</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={inputform.title}
                          onChange={handleChange}
                          placeholder="Enter Product Title"
                          className="shadow-sm"
                        />
                        {inputErr.titleErr && (
                          <Form.Text className="text-danger small">
                            {inputErr.titleErr}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          Category
                        </Form.Label>
                        <Form.Select
                          name="category"
                          value={inputform.category}
                          onChange={handleChange}
                          className="shadow-sm"
                        >
                          <option value="">Select Category</option>
                          <option value="men">Men</option>
                          <option value="women">Women</option>
                          <option value="kids">Kids</option>
                        </Form.Select>
                        {inputErr.categoryErr && (
                          <Form.Text className="text-danger small">
                            {inputErr.categoryErr}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* SUBCATEGORY + BRAND */}
                  {inputform.category && (
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">
                            Subcategory
                          </Form.Label>
                          <Form.Select
                            name="subcategory"
                            value={inputform.subcategory}
                            onChange={handleChange}
                            className="shadow-sm"
                          >
                            <option value="">Select Subcategory</option>
                            {getsubCatagory().map((brand, idx) => (
                              <option key={idx} value={brand}>
                                {brand}
                              </option>
                            ))}
                          </Form.Select>
                          {inputErr.subcategoryErr && (
                            <Form.Text className="text-danger small">
                              {inputErr.subcategoryErr}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">Brand</Form.Label>
                          <Form.Select
                            name="brand"
                            value={inputform.brand}
                            onChange={handleChange}
                            className="shadow-sm"
                          >
                            <option value="">Select Brand</option>
                            {getBrandOptions().map((brand, idx) => (
                              <option key={idx} value={brand}>
                                {brand}
                              </option>
                            ))}
                          </Form.Select>
                          {inputErr.brandErr && (
                            <Form.Text className="text-danger small">
                              {inputErr.brandErr}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                  )}

                  {/* PRICE + STOCK */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Price</Form.Label>
                        <Form.Control
                          type="number"
                          name="price"
                          value={inputform.price}
                          onChange={handleChange}
                          placeholder="Enter Price"
                          className="shadow-sm"
                        />
                        {inputErr.priceErr && (
                          <Form.Text className="text-danger small">
                            {inputErr.priceErr}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Stock</Form.Label>
                        <Form.Control
                          type="number"
                          name="stock"
                          value={inputform.stock}
                          onChange={handleChange}
                          placeholder="Enter Stock"
                          className="shadow-sm"
                        />
                        {inputErr.stockErr && (
                          <Form.Text className="text-danger small">
                            {inputErr.stockErr}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* DISCOUNT */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Discount (%)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="discount"
                      value={inputform.discount}
                      onChange={handleChange}
                      placeholder="Enter Discount"
                      className="shadow-sm"
                    />
                    {inputErr.discountErr && (
                      <Form.Text className="text-danger small">
                        {inputErr.discountErr}
                      </Form.Text>
                    )}
                  </Form.Group>

                  {/* IMAGE INPUTS */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Image</Form.Label>
                        <Form.Control
                          type="file"
                          multiple
                          name="image"
                          onChange={handalImage}
                          className="shadow-sm"
                        />
                      </Form.Group>
                    </Col>

                    <Col sm={12}>
                      <div className="d-flex flex-wrap">
                        {inputform.image &&
                          inputform.image.map((img, i) => (
                            <div key={i} className="position-relative mx-3">
                              <img
                                src={img}
                                alt="preview"
                                width="80px"
                                height="80px"
                                className="border border-2"
                                style={{
                                  borderRadius: "0px",
                                  objectFit: "contain",
                                }}
                              />

                              <Button
                                variant="danger"
                                size="sm"
                                className="position-absolute top-0 start-100 translate-middle  rounded-circle"
                                onClick={() => handalDeletimage(i)}
                              >
                                ✕
                              </Button>
                            </div>
                          ))}
                      </div>
                    </Col>
                  </Row>

                  {inputErr.imageErr && (
                    <Form.Text className="text-danger small">
                      {inputErr.imageErr}
                    </Form.Text>
                  )}

                  {/* RATING + REVIEWS */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Rating</Form.Label>
                        <Form.Control
                          type="number"
                          name="rating"
                          value={inputform.rates.rating}
                          onChange={handleChange}
                          placeholder="0 - 5"
                          className="shadow-sm"
                          max={5}
                        />
                        {inputErr.ratingErr && (
                          <Form.Text className="text-danger small">
                            {inputErr.ratingErr}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Reviews</Form.Label>
                        <Form.Control
                          type="number"
                          name="rests"
                          value={inputform.rates.rests}
                          onChange={handleChange}
                          placeholder="Number of Reviews"
                          className="shadow-sm"
                        />
                        {inputErr.restsErr && (
                          <Form.Text className="text-danger small">
                            {inputErr.restsErr}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* DESCRIPTION */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={inputform.description}
                      onChange={handleChange}
                      placeholder="Enter Product Description"
                      className="shadow-sm"
                    />
                    {inputErr.descriptionErr && (
                      <Form.Text className="text-danger small">
                        {inputErr.descriptionErr}
                      </Form.Text>
                    )}
                  </Form.Group>

                  {/* BUTTON */}
                  <div className="text-center mt-3">
                    <Button
                      type="submit"
                      className="px-5 py-2 fw-semibold rounded-pill"
                      style={{
                        background: "#4a6cf7",
                        border: "none",
                        boxShadow: "0 4px 10px rgba(74,108,247,0.4)",
                      }}
                    >
                      Update Product
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default EditProduct;
