import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import { getallproduct } from "../Services/Action/AddProductAction";
import Filters from "../Filters/Filters";
import { useNavigate } from "react-router-dom";

const Man = () => {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigat = useNavigate()
  useEffect(() => {
    dispatch(getallproduct());
  }, [dispatch]);

  const manProducts = products.filter(
    (p) => (p.category || "").toLowerCase() === "men"
  );

  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    discount: null,
    price: 10000,
  });

  const [sortType, setSortType] = useState("");

  const filtered = manProducts.filter((p) => {

    const productSub = String(p.subcategory || "").toLowerCase();
    const matchesCategory =
      filters.category.length === 0 ||
      filters.category.map((c) => c.toLowerCase()).includes(productSub);

    const matchesBrand =
      filters.brand.length === 0 || filters.brand.includes(p.brand);

    const prodDiscount = Number(p.discount || 0);
    const matchesDiscount =
      filters.discount == null ? true : prodDiscount >= filters.discount;

    const prodPrice = Number(p.price || 0);
    const matchesPrice = prodPrice <= filters.price;

    return (
      matchesCategory &&
      matchesBrand &&
      matchesDiscount &&
      matchesPrice
    );
  });

  // ✅ SORT LOGIC
  const sortProducts = (arr) => {
    let sorted = [...arr];

    switch (sortType) {
      case "high":
        return sorted.sort((a, b) => Number(b.price) - Number(a.price));

      case "low":
        return sorted.sort((a, b) => Number(a.price) - Number(b.price));

      case "a":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));

      case "z":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));

      default:
        return sorted;
    }
  };

  const display = sortProducts(filtered);
  const handalView = (id) => {
    navigat(`/product-info/${id}`)
  }
  return (
    <div className="d-flex gap-3 mt-3 ">
      <Filters category="men" filters={filters} setFilters={setFilters} />

      <Container className="position-relative">
        <Row className="justify-content-end">
          <Col sm={3} className="text-end mb-3">
            <Form.Select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="mt-1"
            >
              <option value="">Recommended</option>
              <option value="high">Price: High to Low</option>
              <option value="low">Price: Low to High</option>
              <option value="a">Title: A - Z</option>
              <option value="z">Title: Z - A</option>
            </Form.Select>
          </Col>
        </Row>

        <Row>
          {display.length > 0 ? (
            display.map((product, index) => (
              <Col md={3} key={product.id || index} style={{ cursor: 'pointer' }}>
                <Card className="shadow-sm border-0 rounded-3 m-2 " onClick={() => handalView(product.id)}>
                  <div className="position-rilative" style={{ position: "relative" }}>
                    <Card.Img
                      variant="top"
                      src={product.image[0]}
                      style={{ height: "260px", objectFit: "cover" }}
                    />

                    <div className="d-flex  align-items-center gap-1  position-absolute bottom-0 start-0 translate-middle-y   bg-white p-1 px-2 ms-2 rounded" style={{fontSize: "0.8rem"}}>
                      <span>{product.rates?.rating || "-"}</span>
                      <AiFillStar size={14} color="green" />
                      <span>|</span>
                      <span>{product.rates?.rests || "-"}</span>
                    </div>
                  </div>

                  <Card.Body>
                    <Card.Title className="fw-bold">{product.brand}</Card.Title>
                    <Card.Text className="text-muted">{product.title}</Card.Text>

                    <div className="mb-2">
                      <small className="fw-bold">
                        Rs.
                        {Number(product.price) -
                          (Number(product.price) *
                            Number(product.discount || 0)) /
                          100}
                      </small>{" "}
                      <small className="text-muted text-decoration-line-through">
                        Rs.{product.price}
                      </small>{" "}
                      <small className="text-danger fw-semibold">
                        ({product.discount || 0}% OFF)
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <h2 className="p-4 text-center">Product Not Found</h2>
          )}
        </Row>
        <div className="">
     <Row className="  justify-content-around position-absolute bottom-0 end-0 translate-middle-y">
      <Col sm={6} className="">
<Button variant="white">Filter</Button>
</Col>
<Col sm={6} className="">
<Button variant="white">Sort</Button>
</Col>
     </Row>
        </div>
      </Container>
    </div>
  );
};

export default Man;
