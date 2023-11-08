import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import "../../../src/styles/ApplyCard.css"
const ApplyPersonalLoanCard = () => {
  return (
    <div className='ApplyLoanCard'>
      <div className='LoanCardFeatures'>
        <h5>Personal Loan</h5>
        <p>Avail personal loan for holiday, home renovation & marriage at attractive interest rates</p>
      </div>
      <div className="LoanCardButtons" style={{bottom: "0", position: 'absolute'}}>
        <Link to ="/applyLoan">
        <Button className="btn btn-secondary" style={{backgroundColor:"#5c636a", width: '50%', borderRadius: '0px'}}>Apply Now</Button>
        </Link>
        <Link to="/loanEligibility">
          <Button className="btn btn-secondary" style={{backgroundColor:"#5c636a", width: '50%', borderRadius: '0px'}}>Check Eligibility</Button>
        </Link>
      </div>
    </div>
  )
}

export default ApplyPersonalLoanCard