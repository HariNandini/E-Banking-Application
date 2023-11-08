import React from 'react'
import { Button } from 'react-bootstrap'
import "../../../src/styles/ApplyCard.css"
const ApplyBusinessLoanCard = () => {
  return (
    <div className='ApplyLoanCard'>
      <div className='LoanCardFeatures' >
        <h5>Business Loan</h5>
        <p>Grow your business with minimum documentation & quick approvals</p>
        <p>Avail easy repayment tenure up to 20 years on Loan Against Business Property.</p>
      </div>
      <div className="LoanCardButtons" style={{bottom: "0", position: 'absolute'}}>
        <Button className="btn btn-secondary" style={{backgroundColor:"#5c636a", width: '50%', borderRadius: '0px'}}>Apply Now</Button>
        <Button className="btn btn-secondary" style={{backgroundColor:"#5c636a", width: '50%', borderRadius: '0px'}}>Check Eligibility</Button>
      </div>
    </div>
  )
}

export default ApplyBusinessLoanCard