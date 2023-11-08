import React from "react";
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
function FinalApproval() {
  return (
    <>
      
        <div style={{'height':'600px'}}>
    <div className='row' >
       <div className='card col-md-6 offset-md-3 offset-md-3' style={{'margin-top': '100px'}}>
         <div className='card-body'>
      <center>
      <p>Your registration has been approved.You can login now</p>
      <Link to='/login'> 
              <Button>
              
              Login
          
              </Button>
        </Link>
    </center>  
    </div>
                </div>
             </div>
         </div>
    </>
  );
}

export default FinalApproval;
