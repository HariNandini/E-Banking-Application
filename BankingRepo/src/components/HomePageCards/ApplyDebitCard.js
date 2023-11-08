import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import "../../../src/styles/ApplyCard.css"
const ApplyDebitCard = () => {

  const navigate= useNavigate();

  const handleOnClickCard=()=>{
    navigate("/debitHomePage");
  }

  return (
      <div className='ApplyCard'>
        <div onClick={handleOnClickCard}>
        <ul>
          <li>
            <div className='CardFeatures'>
              <h5>Debit Card Features</h5>
              <p>Contactless payments</p>
              <p>Online and mobile banking</p>
              <p>Fraud protection</p>
            </div>
          </li>
          <li>
            <div className='CardOffers'>
              <h5>Debit Card Offers</h5>
              <p>1% Cashback on all Online Transactions</p>
              <p>1 Free Movie ticket every month with BookMyShow</p>
            </div>
          </li>
        </ul>
        </div>

      <div style={{'textAlign':"center"}}>
        <Link to = "/applydebitcard">
          <Button className="btn btn-secondary" style={{backgroundColor:"#5c636a"}}>Apply Debit Card</Button>
        </Link>
        
      </div>
    </div>
  )
}

export default ApplyDebitCard
