import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import image from "../img/img4.jpg";
import axios from 'axios';
// import Cookies from 'js-cookie';

const Support = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  // const token = Cookies.get('token');
 
  const support = {
    name,email,message
    };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // formValidation();
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log("support",support);
    axios.post('http://localhost:8080/api/user/support', support
    // ,
    // {
    //   headers: {
    //     Authorization: 'Bearer ' + token //the token is a variable which holds the token
    //   }
    // }
    )
      .then((response) => {
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    // Reset form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container" style={{height:'705px'}}>
    <div style={{backgroundImage:`url(${image})`,
           backgroundPosition: 'center',
           backgroundSize: 'cover',
           backgroundRepeat: 'no-repeat',
           position:"fixed",
           top:0,
           left:0,
           right:0,
           bottom:0,
           overflow: 'hidden',padding:"30px"}}>
            <div className='row' >
                <div className='card col-md-5 offset-md-3 offset-md-3' style={{'margin-top': '100px','border-width':'1px','border-color':'black'}}>
                    <div className='card-body' ></div>
                       <form className="contact-us-form" onSubmit={handleSubmit} style={{marginLeft:'30px', display:"block", width:"75%"}}>
                         <center><h2>Contact Us</h2></center><br></br>
                         <div className="mb-3">
                           <label htmlFor="name"><h6>Name:</h6></label>
                           <input
                             type="text"
                             id="name"
                             value={name}
                             className="form-control"
                             placeholder="Enter name"
                             onChange={(e) => setName(e.target.value)}
                             required
                           />
                          </div>
                        <div className="mb-3">
                        <label htmlFor="email"><h6>Email:</h6></label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          className="form-control"
                          placeholder="Enter email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                       </div>
                       <div className="mb-3">
                         <label htmlFor="message"><h6>Message:</h6></label>
                         <textarea
                           id="message"
                           value={message}
                           className="form-control"
                           placeholder="Enter message"
                           onChange={(e) => setMessage(e.target.value)}
                           required
                         ></textarea>
                       </div>
                       <center><Button type="submit" >Submit</Button></center>
                       <br></br>
                      </form>
                      </div>
                      
                      <div className="direct-contact-container" style={{display: 'flex', flexDirection: 'row-reverse','color':'aliceblue'}}>
                      <br/><br/>
                      <ul style={{listStyle:"none", paddingTop: "20px", lineHeight: "30px", paddingRight: "30px"}}>
                      <li>
                        <Phone /> +91 9886678834
                      </li>
                      <li>
                        <Email /> info@easywaybanking.com
                      </li>
                      <li>
                        <LocationOn /> 123 Main St, Hyderabad, Telangana, India
                      </li>
                    </ul>
              </div>
              </div>
              </div>
              </div>
            );
          };
          
          export default Support;
