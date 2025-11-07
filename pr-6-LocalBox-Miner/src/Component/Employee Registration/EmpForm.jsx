import { Container, Row, Col, Form, Button, Card, } from "react-bootstrap";
import { FaUserPlus, FaCamera, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaUserTie } from "react-icons/fa";
import './EmpForm.css';
import { useState,useEffect } from "react";
import uniqueId from 'generate-unique-id'

const EmpForm = () => {
  const storageData = ()=>{
    return JSON.parse(localStorage.getItem('empdetails')) || []
  }
const emailregex = /^[^@]+@[^@]+\.[^@]+$/;
const initialvalue = {
  fullName:"",
  email:"",
  phone:"",
  joiningDate:"",
  experienceYears:"",
  department:"",
  role:"",
  address:"",
  imageUrl:"",
}

const [inputForm,setInputForm] = useState(initialvalue)
const [inputError,setinputError] = useState({})
const [storage,setStorage] = useState(storageData())



const handalSubmit = (e)=>{
  e.preventDefault()
  if(handalError()){

 inputForm.id  ="EMP"+ uniqueId({
      length:5,
       useLetters:false,
     }) 

     setStorage([
      ...storage,
      inputForm,
     ])
  
     setInputForm(initialvalue)
  }
  
}
const handalchange = (e)=>{
  const {name,value} = e.target
   setInputForm({
    ...inputForm,
    [name]:value
    
   })
}

const handalError = ()=>{
 let errors = {}
 if(inputForm.fullName==""){
     errors.fullNameErr = "Enter Your Full Name";
 } 

  if (!emailregex.test(inputForm.email)){
     errors.emailErr = "Enter a Valid Email";
 } 
 if(inputForm.phone.length>10 ||inputForm.phone.length<10 ){
     errors.phoneErr = "Enter A 10 Digit number";
 }
 if(inputForm.joiningDate ===""){
     errors.joiningDateErr = "Select Date";
   
 }

  if(inputForm.experienceYears ===""){
     errors.experienceYearsErr = "Enter ExperienceYears";
 }

   if(inputForm.department ===""){
     errors.departmentErr = "Select department";
 }

   if(inputForm.role ===""){
     errors.roleErr = "Seslct Your Role";
 }
 if(inputForm.address ===""){
     errors.addressErr = "Enter Your Address";
 }
   if(inputForm.imageUrl ===""){
     errors.imageUrlErr = "Enter image Url";
 }
 setinputError(errors)
 return Object.keys(errors) == 0
}
useEffect(() => {
 localStorage.setItem('empdetails',JSON.stringify(storage))
}, [storage])
  return (
    <div className="modern-form-bg">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={7}>
            <div className="text-center mb-5">
              <div className="header-icon mb-3">
                <FaUserPlus />
              </div>
              <p className="text-white-50">Welcome to the team! Please complete your registration details</p>
            </div>

            <Card className="glass-form-card border-0">
              <Card.Body className="p-4">
                <Form onSubmit={handalSubmit}>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group controlId="fullName" className="form-group-modern">
                        <Form.Label className="fw-semibold">
                          <FaUserTie className="me-2" />
                          Full Name
                        </Form.Label>
                        <Form.Control type="text" name="fullName" placeholder="Enter your full name" className="modern-input" value={inputForm.fullName} onChange={handalchange} />                        
                      {inputError.fullNameErr?<small className="text-danger">{inputError.fullNameErr}</small>:""}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="email" className="form-group-modern">
                        <Form.Label className="fw-semibold">
                          <FaEnvelope className="me-2" />
                          Email Address
                        </Form.Label>
                        <Form.Control type="email" name="email" placeholder="your.email@company.com" className="modern-input"value={inputForm.email} onChange={handalchange} />
                      {inputError.emailErr?<small className="text-danger">{inputError.emailErr}</small>:""}

                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group controlId="phone" className="form-group-modern">
                        <Form.Label className="fw-semibold">
                          <FaPhone className="me-2" />
                          Phone Number
                        </Form.Label>
                        <Form.Control type="tel" name="phone" placeholder="+91 5551234567" maxLength={10} minLength={10} className="modern-input"value={inputForm.phone} onChange={handalchange} />
                      {inputError.phoneErr?<small className="text-danger">{inputError.phoneErr}</small>:""}

                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="joiningDate" className="form-group-modern">
                        <Form.Label className="fw-semibold">
                          <FaCalendarAlt className="me-2" />
                          Joining Date
                        </Form.Label>
                        <Form.Control name="joiningDate" type="date" className="modern-input" value={inputForm.joiningDate} onChange={handalchange} />
                      {inputError.joiningDateErr?<small className="text-danger">{inputError.joiningDateErr}</small>:""}

                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={4}>
                      <Form.Group controlId="experienceYears" className="form-group-modern">
                        <Form.Label className="fw-semibold">Experience</Form.Label>
                        <Form.Control name="experienceYears" placeholder="Years of experience" className="modern-input" value={inputForm.experienceYears} onChange={handalchange} />
                      {inputError.experienceYearsErr?<small className="text-danger">{inputError.experienceYearsErr}</small>:""}

                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="department" className="form-group-modern">
                        <Form.Label className="fw-semibold">Department</Form.Label>
                        <Form.Select name="department" className="modern-select" value={inputForm.department} onChange={handalchange}>
                          <option value="">Choose department</option>
                          <option value="engineering">Engineering</option>
                          <option value="hr">Human Resources</option>
                          <option value="marketing">Marketing</option>
                          <option value="sales">Sales</option>
                          <option value="finance">Finance</option>
                          <option value="design">Design</option>
                        </Form.Select>
                      {inputError.departmentErr?<small className="text-danger">{inputError.departmentErr}</small>:""}

                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="role" className="form-group-modern">
                        <Form.Label className="fw-semibold">Job Role</Form.Label>
                        <Form.Select name="role" className="modern-select" value={inputForm.role} onChange={handalchange}>
                          <option value="">Select your role</option>
                          <option value="developer">Developer</option>
                          <option value="designer">Designer</option>
                          <option value="manager">Manager</option>
                          <option value="analyst">Analyst</option>
                          <option value="intern">Intern</option>
                          <option value="lead">Team Lead</option>
                        </Form.Select>
                      {inputError.roleErr?<small className="text-danger">{inputError.roleErr}</small>:""}

                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="address" className="form-group-modern mb-4">
                    <Form.Label className="fw-semibold">
                      <FaMapMarkerAlt className="me-2" />
                      Home Address
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="address"
                      rows={3}
                      placeholder="Enter your complete residential address"
                      className="modern-textarea"
                      value={inputForm.address} onChange={handalchange}
                    />
                      {inputError.addressErr?<small className="text-danger">{inputError.addressErr}</small>:""}

                  </Form.Group>

                  <div className="image-upload-section p-4 rounded-3 mb-4">
                    <Row className="align-items-center">
                      <Col md={8}>
                        <Form.Group controlId="imageUrl" className="form-group-modern">
                          <Form.Label className="fw-semibold">
                            <FaCamera className="me-2" />
                            Profile Photo URL
                          </Form.Label>
                          <Form.Control type="url" name="imageUrl" placeholder="Image Url" className="modern-input" value={inputForm.imageUrl} onChange={handalchange}/>
                      {inputError.imageUrlErr?<small className="text-danger">{inputError.imageUrlErr}</small>:""}
                          <Form.Text className="text-muted d-block">
                            Provide a direct link to your professional headshot image
                          </Form.Text>
                          
                        </Form.Group>
                      </Col>
                     
                    </Row>
                  </div>

                  <div className="text-center pt-3">
                    <Button type="submit" className="modern-submit-btn py-3 px-5">
                      <FaUserPlus className="me-2" />
                      Complete Registration
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <p className="text-white-50 small">
                Your information is secure and will be used for official records only
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EmpForm;