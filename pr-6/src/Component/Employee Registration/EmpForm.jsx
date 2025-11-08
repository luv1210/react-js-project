import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import {
  FaUserPlus,
  FaCamera,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaUserTie,
} from "react-icons/fa";
import "./EmpForm.css";
import { useState, useEffect } from "react";
import uniqueId from "generate-unique-id";

const EmpForm = () => {
  const storageData = () => JSON.parse(localStorage.getItem("empdetails")) || [];

  const emailregex = /^[^@]+@[^@]+\.[^@]+$/;
  const initialvalue = {
    fullName: "",
    email: "",
    phone: "",
    joiningDate: "",
    experienceYears: "",
    department: "",
    role: "",
    address: "",
    imageUrl: "",
  };

  const [inputForm, setInputForm] = useState(initialvalue);
  const [inputError, setinputError] = useState({});
  const [storage, setStorage] = useState(storageData());

  const handalSubmit = (e) => {
    e.preventDefault();
    if (handalError()) {
      inputForm.id =
        "EMP" +
        uniqueId({
          length: 5,
          useLetters: false,
        });

      setStorage([...storage, inputForm]);
      setInputForm(initialvalue);
    }
  };

  const handalchange = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handalError = () => {
    let errors = {};
    if (inputForm.fullName === "") errors.fullNameErr = "Enter your full name";
    if (!emailregex.test(inputForm.email))
      errors.emailErr = "Enter a valid email";
    if (inputForm.phone.length !== 10)
      errors.phoneErr = "Enter a 10-digit number";
    if (inputForm.joiningDate === "")
      errors.joiningDateErr = "Select joining date";
    if (inputForm.experienceYears === "")
      errors.experienceYearsErr = "Enter experience years";
    if (inputForm.department === "")
      errors.departmentErr = "Select department";
    if (inputForm.role === "") errors.roleErr = "Select role";
    if (inputForm.address === "") errors.addressErr = "Enter address";
    if (inputForm.imageUrl === "") errors.imageUrlErr = "Enter image URL";

    setinputError(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    localStorage.setItem("empdetails", JSON.stringify(storage));
  }, [storage]);

  return (
    <div className="empform-bg py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={7}>
            <div className="text-center mb-5">
              <div className="header-icon mb-3">
                <FaUserPlus />
              </div>
              <h3 className="fw-bold text-white mb-2">Employee Registration</h3>
              <p className="text-white-50">
                Fill in the details below to complete your onboarding
              </p>
            </div>

            <Card className="empform-card glass-card border-0 shadow-lg">
              <Card.Body className="p-4 p-md-5">
                <Form onSubmit={handalSubmit}>
                  {/* Full Name & Email */}
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          <FaUserTie className="me-2" /> Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          placeholder="Enter full name"
                          className="modern-input"
                          value={inputForm.fullName}
                          onChange={handalchange}
                        />
                        {inputError.fullNameErr && (
                          <small className="text-danger">
                            {inputError.fullNameErr}
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          <FaEnvelope className="me-2" /> Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="email@company.com"
                          className="modern-input"
                          value={inputForm.email}
                          onChange={handalchange}
                        />
                        {inputError.emailErr && (
                          <small className="text-danger">
                            {inputError.emailErr}
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Phone & Joining Date */}
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          <FaPhone className="me-2" /> Phone
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          placeholder="10-digit number"
                          maxLength={10}
                          className="modern-input"
                          value={inputForm.phone}
                          onChange={handalchange}
                        />
                        {inputError.phoneErr && (
                          <small className="text-danger">
                            {inputError.phoneErr}
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          <FaCalendarAlt className="me-2" /> Joining Date
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="joiningDate"
                          className="modern-input"
                          value={inputForm.joiningDate}
                          onChange={handalchange}
                        />
                        {inputError.joiningDateErr && (
                          <small className="text-danger">
                            {inputError.joiningDateErr}
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Experience, Department, Role */}
                  <Row className="mb-4">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Experience (Years)</Form.Label>
                        <Form.Control
                          name="experienceYears"
                          placeholder="e.g., 3"
                          className="modern-input"
                          value={inputForm.experienceYears}
                          onChange={handalchange}
                        />
                        {inputError.experienceYearsErr && (
                          <small className="text-danger">
                            {inputError.experienceYearsErr}
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                          name="department"
                          className="modern-select"
                          value={inputForm.department}
                          onChange={handalchange}
                        >
                          <option value="">Choose</option>
                          <option value="engineering">Engineering</option>
                          <option value="hr">HR</option>
                          <option value="marketing">Marketing</option>
                          <option value="sales">Sales</option>
                          <option value="finance">Finance</option>
                          <option value="design">Design</option>
                        </Form.Select>
                        {inputError.departmentErr && (
                          <small className="text-danger">
                            {inputError.departmentErr}
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                          name="role"
                          className="modern-select"
                          value={inputForm.role}
                          onChange={handalchange}
                        >
                          <option value="">Select</option>
                          <option value="developer">Developer</option>
                          <option value="designer">Designer</option>
                          <option value="manager">Manager</option>
                          <option value="analyst">Analyst</option>
                          <option value="intern">Intern</option>
                          <option value="lead">Team Lead</option>
                        </Form.Select>
                        {inputError.roleErr && (
                          <small className="text-danger">
                            {inputError.roleErr}
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Address */}
                  <Form.Group className="mb-4">
                    <Form.Label>
                      <FaMapMarkerAlt className="me-2" /> Address
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="address"
                      placeholder="Complete residential address"
                      className="modern-textarea"
                      value={inputForm.address}
                      onChange={handalchange}
                    />
                    {inputError.addressErr && (
                      <small className="text-danger">
                        {inputError.addressErr}
                      </small>
                    )}
                  </Form.Group>

                  {/* Image URL */}
                  <Form.Group className="mb-4">
                    <Form.Label>
                      <FaCamera className="me-2" /> Profile Image URL
                    </Form.Label>
                    <Form.Control
                      type="url"
                      name="imageUrl"
                      placeholder="Paste your image link"
                      className="modern-input"
                      value={inputForm.imageUrl}
                      onChange={handalchange}
                    />
                    {inputError.imageUrlErr && (
                      <small className="text-danger">
                        {inputError.imageUrlErr}
                      </small>
                    )}
                  </Form.Group>

                  <div className="text-center pt-3">
                    <Button type="submit" className="modern-submit-btn px-5 py-3">
                      <FaUserPlus className="me-2" /> Submit Details
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EmpForm;
