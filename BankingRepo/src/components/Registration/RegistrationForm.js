import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function RegistrationForm() {
  const [userInfo, setUserInfo] = useState({
    customerId: '',
    firstName: '',
    lastName: '',
    emailId: '',
    mobileNumber: '',
    password: ''
  });

  // form
  const[customerIdErr,setCustomerIdErr]=useState({});
  const[firstNameErr,setFirstNameErr]=useState({});
  const[lastNameErr,setLastNameErr]=useState({});
  const[emailIdErr,setEmailIdErr]=useState({});
  const[mobileNoErr,setMobileNoErr]=useState({});



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo.customerId)
    if(formValidation()) {
    axios.post('http://localhost:8080/api/user/checkCustomerId/' + userInfo.customerId)
      .then((response) => {
        console.log(response.data + " " + userInfo);
        if (response.data === true) {
          axios.post('http://localhost:8080/api/user/register', userInfo)
            .then((response) => {
              // Handle success
              console.log(response);
              window.location.href = '/user/verify';
            })
            .catch((error) => {
              // console.log(error.response.data.message);
              window.alert(error.response.data.message)
            });
        }
      })
      .catch((error) => {
        console.error(error);
        window.alert(error.response.data.message);
      });
    }
  };

//    //  Form
   const formValidation = () =>{
    const customerIdErr = {};
    const firstNameErr = {};
    const lastNameErr = {};
    const emailIdErr = {};
    const mobileNoErr = {};
    // const passwordErr = {};
    let isValid = true;
    if(userInfo.customerId.trim().length===0){
      customerIdErr.customerIdEmpty = "Customer Id is required";
    isValid = false;
    }
    else if((userInfo.customerId.trim().length!==5)){
      customerIdErr.customerIdLength = "Customer Id should be 5 digits";
      isValid = false;
    }
    if(userInfo.firstName.trim().length===0){
     firstNameErr.firstNameEmpty = "First Name is required";
     isValid = false;
   }
   if(userInfo.lastName.trim().length===0){
     lastNameErr.lastNameEmpty = "Last Name is required";
     isValid = false;
   }
   if(userInfo.emailId.trim().length===0){
     emailIdErr.emailIdEmpty = "EmailId is required";
   isValid = false;
   }
   else if((userInfo.emailId.endsWith("@gmail.com"))===false){
     emailIdErr.emailIdError = "@gmail.com is required";
     isValid = false;

   }

   if((userInfo.mobileNumber.toString().length!==10)){
     mobileNoErr.mobileNolength = "Mobile Number should be 10 digits";
     isValid = false;
   }

   setCustomerIdErr(customerIdErr);
   setFirstNameErr(firstNameErr);
   setLastNameErr(lastNameErr);
   setEmailIdErr(emailIdErr);
   setMobileNoErr(mobileNoErr);
   return isValid;
 }

  return (
    <div style={{ 'height': '700px' }}>
      <div className='row' >
        <div className='card col-md-6 offset-md-3 offset-md-3' style={{ marginTop: '100px', marginBottom: '30px' }}>
          <div className='card-body'>

            <form onSubmit={handleSubmit}>
              <center><h3>Sign Up</h3></center>
              <div className="mb-3">
                <label><h6>Customer Id:</h6></label>
                <input type="text" className="form-control" name="customerId" value={userInfo.customerId} onChange={handleChange} placeholder="customerId"  />
              </div>

              {Object.keys(customerIdErr).map((key)=>{
                return <div style={{color : "red"}}>{customerIdErr[key]}</div>
              })}

              <div className="mb-3">
                <label><h6>First Name:</h6></label>
                <input type="text" className="form-control" name="firstName" value={userInfo.firstName} onChange={handleChange} placeholder="firstName" />
              </div>

              {Object.keys(firstNameErr).map((key)=>{
                return <div style={{color : "red"}}>{firstNameErr[key]}</div>
              })}

              <div className="mb-3">
                <label><h6>Last Name:</h6></label>
                <input type="text" className="form-control" name="lastName" value={userInfo.lastName} onChange={handleChange} placeholder="lastName"  />
              </div>

              {Object.keys(lastNameErr).map((key)=>{
                return <div style={{color : "red"}}>{lastNameErr[key]}</div>
              })}

              <div className="mb-3">
                <label><h6>Email address:</h6></label>
                <input type="email" className="form-control" name="emailId" value={userInfo.emailId} onChange={handleChange} placeholder="emailId" />
              </div>

              {Object.keys(emailIdErr).map((key)=>{
                return <div style={{color : "red"}}>{emailIdErr[key]}</div>
              })}

              <div className="mb-3">
                <label><h6>Phone number:</h6></label>
                <input type="number" className="form-control" name="mobileNumber" value={userInfo.mobileNumber} onChange={handleChange} placeholder="mobileNumber"  />
              </div>

              {Object.keys(mobileNoErr).map((key)=>{
                return <div style={{color : "red"}}>{mobileNoErr[key]}</div>
              })}


              <center><Button type="submit" >Register</Button></center>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
