import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { AiOutlineHeart } from "react-icons/ai";
import { FiTruck } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewProduct = () => {
  const [ingindex , setingindex] = useState(0)
    const {products} = useSelector((state)=>state)
    const {id} = useParams()
    const product = products.find((product)=> product.id == id)
    console.log(product)
  if (!product) return <p className="p-5">Product Not Found</p>;

 const handalimage=(index)=>{
  setingindex(index)
 }

  return (
    <Container >
      <Row className="mt-5">
        {/* ---------------- LEFT SIDE IMAGES ---------------- */}
        <Col md={6}>
          <Row >
            <Col md={2}>
            <Row className="flex-column">
              {product.image.map((img, index) => (
              <Col md={12} key={index} className="mb-3" onMouseEnter={()=>handalimage(index)} style={{cursor:'pointer'}}>
                <Card className="shadow-sm border-0">
                  <Card.Img
                    src={img}
                    style={{
                      width: "100px",
                      height:"100px",
                      objectFit: "cover",
    objectPosition: "center"

                    }}
                  />
                </Card>
              </Col>
            ))}
            </Row>
            </Col>
          <Col md={8} className="text-center mx-3 ">
          <img src={product.image[ingindex]} alt="" width={"100%"} height={"500px"} style={{
    height: "500px",
    objectFit: "cover",
    objectPosition: "center"
  }}className="w-100" />
          </Col>
          </Row>
        </Col>

        {/* ---------------- RIGHT SIDE DETAILS ---------------- */}
        <Col md={6}>
          {/* BRAND */}
          <h3 className="fw-bold">{product.brand}</h3>

          {/* TITLE */}
          <h5 className="text-muted">{product.title}</h5>

          {/* PRICE */}
          <div className="mt-3 mb-4">
            <h4 className="fw-bold text-dark">₹ {Math.floor(Number(product.price) -
                          (Number(product.price) *
                            Number(product.discount || 0)) /
                            100)}</h4>
            <div>
              <span className="text-decoration-line-through text-muted">
                MRP ₹{product.price}
              </span>
              <span className="text-danger fw-semibold ms-2">
                ({product.discount}% OFF)
              </span>
            </div>
            <small className="text-success">inclusive of all taxes</small>
          </div>

          {/* SIZE SELECTOR */}
          <h6 className="fw-bold mt-4">SELECT SIZE</h6>
          <div className="d-flex gap-2 flex-wrap mb-4">
            {["S", "M", "L", "XL","XXL"].map((s) => (
              <Button
                key={s}
                variant="outline-danger"
                className="rounded-circle"
                style={{ width: 50, height: 50 }}
              >
                {s}
              </Button>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="d-flex gap-3 mb-4">
            <Button
              variant="danger"
              className="px-4 py-2 d-flex align-items-center fw-bold"
            >
              ADD TO BAG
            </Button>

            <Button
              variant="outline-dark"
              className="px-4 py-2 d-flex align-items-center fw-bold"
            >
              <AiOutlineHeart size={20} className="me-2" />
              WISHLIST
            </Button>
          </div>

          {/* DELIVERY OPTIONS */}
          <div className="mt-4">
            <h6 className="fw-bold">
              DELIVERY OPTIONS <FiTruck className="ms-2" />
            </h6>

           <div className="position-relative mt-2">
  <Form.Control
    placeholder="Enter pincode"
    className="py-3"      
  />
  
  <Button
    variant=" "

    className="position-absolute end-0  top-50 translate-middle-y text-danger "
    style={{ height: "75%" }}
  >
    CHECK
  </Button>
</div>


            <small className="text-muted">
              Please enter PIN to check delivery time & Pay on Delivery
              availability.
            </small>
          </div>

          <hr className="my-4" />

          {/* EXTRA DETAILS */}
          <div>
            <h6 className="fw-bold">100% ORIGINAL PRODUCTS</h6>
            <p className="text-muted">
              Fast delivery options available depending on your pincode.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewProduct;
