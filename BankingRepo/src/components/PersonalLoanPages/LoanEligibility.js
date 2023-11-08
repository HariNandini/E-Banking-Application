import React from 'react'
import {Button, Table} from 'react-bootstrap'
import { Link } from 'react-router-dom'

function LoanEligibility() {
  return (
    <div className='container'>
      <div style={{display: "flex", flexDirection: "row"}}>
       <div>
          <h3 style={{'marginTop':'6rem'}}>Personal Loan Eligibility</h3>
          <h5>Individuals who can take a Personal Loan:</h5>
            <div>
                <ul>
                <li>Salaried Employees</li>
                <li>Minimum age of 21 years</li>
                <li>Maximum age of 60 years at the time of maturity of the Personal Loan</li>
                <li>Minimum net monthly income - Rs. 15,000</li>
                </ul>
            </div>
          <h5>Documents required for Personal Loan</h5>
          <div>
            <ul>
              <li>Duly filled application form</li>
              <li>KYC documents</li>
              <li>Loan agreement duly signed and Standing Instruction (SI) Request / ECS Forms</li>
            </ul>
          </div>
        </div>
       <div style={{marginTop: "240px", marginLeft: "150px",  width: "50%"}}>
        <Link to = "/applyLoan"> <button type="button" className="btn btn-dark" >Apply Loan Here</button></Link>
       </div>
       </div>
       <br></br>
       <div className='table' style={{width:'75%',margin:"auto",'background': 'gainsboro','marginBottom':'70px'}}>
       <Table striped bordered>
         <tbody>
           <tr>
            <th>Document category</th>
            <th>Documents required</th>
           </tr>
           <tr>
            <td>KYC Document</td>
            <td>"Any one of the following KYC documents (OVD) to be collected as per extant policy of RBI:"
           <br></br>
           <Table striped bordered>
           <tbody>
           
           <tr>
           <td>Passport</td>
           <td>Driving license with Photograph</td>
           <td>Proof of possession of Aadhaar number </td>          
          </tr>
          <tr>
           <td>Voter's ID</td>
           <td>Job Card by NREGA signed by an officer of the State Government</td>
           <td>"Letter issued by the National Population Register containing details of Name, Address"</td>
          </tr>
          </tbody>
          </Table>
          <br></br>
          <Table></Table>
          </td>
          </tr>
          <tr>
           <td>Date of Birth Proof</td>
           <td>
           "Any one of the following:"
           <br></br>
           <Table striped bordered>
            <tbody>
             <tr>
              <td>Passport</td>
              <td>PAN Card</td>
              <td>Aadhaar Card with DOB</td>
             </tr>
             <tr>
              <td>Driving license with Photograph</td>
              <td>Birth Certificate</td>
              <td>School Leaving Certificate</td>
             </tr>
            </tbody>
           </Table>
           </td>
          </tr>
          <tr>
            <td>Signature Proof</td>
            <td>
            <p>Any one of the following:</p>
            <ul className="basicList">
             <li>"Passport" </li>
             <li>"Pan Card" </li>
             <li>"Banker's Verification" </li>
            </ul>
            </td>
          </tr>
          <tr>
            <td>Proof of Income</td>
            <td>
             <ul className="basicList">
              <li>"Latest 2 months pay slip" </li>
              <li>"Latest 2 months bank statement showing salary credits" </li>
              <li>"One year Employment proof (Not required if DOJ mentioned in payslip and working for more than 1 year)" </li>
             </ul>
            </td>
          </tr>
          <tr>
           <td>Other Important Documents and Checks</td>
           <td>
            <ul className="basicList">
             <li>"Completely filled and duly signed application form along with applicants' latest passport size colour photo" </li>
             <li>"Self-attestation of borrowers on all documents" </li>
             </ul>
           </td>
          </tr>
         </tbody>
       </Table>
       </div>

    </div>
  )
}

export default LoanEligibility