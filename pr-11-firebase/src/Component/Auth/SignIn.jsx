import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button, InputGroup, Alert } from "react-bootstrap";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { googlesinginasync, usersigninasync } from "../Services/Action/userAction";
// import { googleLogin } from "../redux/actions/userActions"; // 👈 your google login action

const SignIn = () => {
  const dispatch = useDispatch();
  const naviget = useNavigate()
  const { loading, error,user } = useSelector((state) => state.userReducer);
 const initialvalue = {
    email: "",
    password: "",
  }
  const [formData, setFormData] = useState(initialvalue);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
  const {name,value} = e.target
  setFormData({
    ...formData,
    [name]:value
  })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(usersigninasync(formData)); 
  };

  const handleGoogle = () => {
    dispatch(googlesinginasync()); 
    console.log("Google Sign-In clicked");
  };
   useEffect(()=>{
   if(user){
    setFormData(initialvalue)
    naviget('/')
   }
   },[user])
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h3 className="text-center mb-4 fw-bold">Sign In</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaEnvelope />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>

                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />

                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Remember */}
            <Form.Check
              type="checkbox"
              label="Remember me"
              className="mb-3"
            />

            {/* Login Button */}
            <Button
              type="submit"
              className="w-100 fw-bold"
              variant="dark"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="d-flex align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="mx-2 text-muted">OR</span>
            <hr className="flex-grow-1" />
          </div>

          {/* Google Sign-In */}
          <Button
            className="w-100 fw-bold d-flex justify-content-center align-items-center gap-2"
            variant="outline-danger"
            onClick={handleGoogle}
          >
            <FaGoogle size={18} />
            Sign in with Google
          </Button>

          {/* Sign Up */}
          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <Link to="/signup" className="fw-semibold">
              Sign Up
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
