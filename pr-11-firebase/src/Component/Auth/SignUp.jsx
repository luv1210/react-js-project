import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button, InputGroup, Alert } from "react-bootstrap";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { usersignupasync } from "../Services/Action/userAction";
// import { registerUser, googleLogin } from "../redux/actions/userActions";

const SignUp = () => {
  const dispatch = useDispatch();
  const naviget = useNavigate()
  const { isCreated,error,loading } = useSelector((state) => state.userReducer);
const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }
  const [formData, setFormData] = useState(initialState);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passError, setPassError] = useState("");

  const handleChange = (e) => {
     const {name,value} = e.target 
     setFormData({
      ...formData,
      [name]:value
     })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPassError("Passwords do not match");
      return;
    }
    console.log("Sign Up Data:", formData);
    dispatch(usersignupasync(formData))
  };

  const handleGoogle = () => {
    // dispatch(googleLogin());
    console.log("Google Sign-Up Clicked");
  };


  useEffect(()=>{
  if(isCreated){
    setFormData(initialState)
    naviget('/signin')
  }
  },[isCreated])
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h3 className="text-center mb-4 fw-bold">Create Account</h3>

          {error && <Alert variant="danger">{error}</Alert>}
          {passError && <Alert variant="warning">{passError}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Full Name */}
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>

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

            {/* Confirm Password */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>

                <Form.Control
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Sign Up Button */}
            <Button
              type="submit"
              className="w-100 fw-bold"
              variant="dark"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="d-flex align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="mx-2 text-muted">OR</span>
            <hr className="flex-grow-1" />
          </div>

          {/* Google Sign-Up */}
          <Button
            className="w-100 fw-bold d-flex justify-content-center align-items-center gap-2"
            variant="outline-danger"
            onClick={handleGoogle}
          >
            <FaGoogle />
            Sign Up with Google
          </Button>

          <div className="text-center mt-3">
            <span>Already have an account? </span>
            <Link to="/signin" className="fw-semibold">
              Sign In
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
