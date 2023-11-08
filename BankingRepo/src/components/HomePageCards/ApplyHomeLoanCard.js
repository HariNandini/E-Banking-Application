import React from 'react'
import { Button } from 'react-bootstrap'
import "../../../src/styles/ApplyCard.css"
const ApplyHomeLoanCard = () => {
  return (
    <div className='ApplyLoanCard'>
      <div className='LoanCardFeatures'>
        <h5>Home Loan</h5>
        <p>Affordable and flexible home loans to take you closer to your dream home.</p>
        <p>Choose from a wide range of home loans depending on your needs</p>
      </div>
      <div className="LoanCardButtons" style={{bottom: "0", position: 'absolute'}}>
        <Button className="btn btn-secondary" style={{backgroundColor:"#5c636a", width: '50%', borderRadius: '0px'}}>Apply Now</Button>
        <Button className="btn btn-secondary" style={{backgroundColor:"#5c636a", width: '50%', borderRadius: '0px'}}>Check Eligibility</Button>
      </div>
    </div>
  )
}

export default ApplyHomeLoanCard