import React from 'react'
import image from "../img/img-1.png"
function Aboutus() {
  return (
       <div className="container" style={{height:'705px'}}>
       <div style={{ backgroundImage:`url(${image})`,backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  position:"fixed",
                  top:"30px",
                  left:0,
                  right:0,
                  bottom:0,
                  overflow: 'hidden',padding:"30px"}}>
             <div style={{transform:"translateY(20%)",width:"50%"}} >
                  <div>
                         <h3 style={{'color':'blue'}}>About Us</h3> &nbsp;
                           <span>Welcome to our banking application! Our mission is to provide a secure and easy-to-use platform for our customers to manage their finances. We understand the importance of trust when it comes to banking, and we take that responsibility seriously.</span>
                           <br/><br/>     <span>At our core, we believe that banking should be accessible to everyone. That's why we offer a variety of account options, including checking, savings, and investment accounts, to help you achieve your financial goals. Whether you're just starting out or looking to grow your wealth, we have the tools and resources to help you succeed.</span>
                           <br/><br/>      <span>We value our customers and are committed to providing excellent customer service. Our support team is available 24/7 to answer any questions you may have and help you resolve any issues. We also take your security seriously and use advanced encryption and authentication methods to protect your information.</span>
                           <br/><br/>  <span>Thank you for choosing our banking application. We are excited to have you as a customer and look forward to helping you achieve your financial goals.</span>
                  </div>
              </div>     
            </div>
            </div>
    
  )
}

export default Aboutus