import React from 'react'
import { Button } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import "../../../src/styles/ApplyCard.css"
const ApplyCreditCard = () => {
  const navigate= useNavigate();

  const handleOnClickCard=()=>{
    navigate("/creditHomePage");
  }

  return (
    <div className='ApplyCard'>
    <div onClick={handleOnClickCard}>
        <ul>
          <li>
            <div className='CardFeatures'>
              <h5>Credit Card Features</h5>
              <p>Contactless payments</p>
              <p>Online and mobile banking</p>
              <p>Fraud protection</p>
            </div>
          </li>
          <li>
            <div className='CardOffers'>
              <h5>Credit Card Offers</h5>
              <p>100% Cashback upto Rs 250 in first30 days</p>
              <p>Up to 33% off + Addition 10% off</p>
            </div>
          </li>
        </ul>
        </div>
      <div style={{'textAlign':"center"}}>
      <Link to = "/applycreditcard">
        <Button className="btn btn-secondary" style={{backgroundColor:"#5c636a"}}>Apply Credit Card</Button>
        </Link>
        </div>
        
    </div>
  )
}

export default ApplyCreditCard
