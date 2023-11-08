import React, { useState } from 'react';
import axios from 'axios';

const Passwordset = () => {

  const [passwordset, setpasswordset] = useState({
    customerId:'',
    password:''
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setpasswordset((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Make a POST request to save the password
    axios.post('http://localhost:8080/api/user/password', passwordset)
      .then((response) => {
        console.log(passwordset)
        console.log('Password saved:', response.data);
        window.location.href = '/user/verified';
        // Handle success or display a confirmation message
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error or display an error message
      });
  };

  return (
    <div style={{'height':'600px'}}>
            <div className='row'>
               <div className='card col-md-6 offset-md-3 offset-md-3' style={{'margin-top': '100px'}}>
             <div className='card-body'>
                 
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
                             <label><h6>Customer Id:</h6></label>
                             <input type="text" className="form-control" name="customerId" value={passwordset.customerId} onChange={handleChange} placeholder="customerId" maxLength={5} minLength={5} required/>
                           </div>
                           <div className="mb-3">
                             <label><h6>Password:</h6></label>
                             <input type="text" className="form-control" name="password" value={passwordset.password} onChange={handleChange} placeholder="password" required />
                           </div>
      <button type="submit">Save</button>
    </form>
    </div>
                </div>
             </div>
             </div>
             
  );
};

export default Passwordset;
