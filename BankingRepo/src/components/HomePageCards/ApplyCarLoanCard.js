import React from 'react'
import { Button } from 'react-bootstrap'
import "../../../src/styles/ApplyCard.css"
const ApplyCarLoanCard = () => {
  return (
    <div className='ApplyLoanCard'>
      <div className='LoanCardFeatures'>
        <h5>Car Loan</h5>
        <p>Benefit from a high Loan To Value ratio</p>
        <p>Loans to purchase pre-owned commercial vehicles or refinance existing free vehicles</p>
      </div>
      <div className="LoanCardButtons" style={{bottom: "0", position: 'absolute'}}>
        <Button className="btn btn-secondary" style={{backgroundColor:"#5c636a", width: '50%', borderRadius: '0px'}}>Apply Now</Button>
        <Button className="btn btn-secondary" style={{backgroundColor:"#5c636a", width: '50%', borderRadius: '0px'}}>Check Eligibility</Button>
      </div>
    </div>
  )
}

export default ApplyCarLoanCard