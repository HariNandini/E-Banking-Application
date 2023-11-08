import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { Accordion, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';

function Profile() {
  const [user, setUserInfo] = useState();
  const [debitInfo,setDebitInfo] = useState()
  const [creditInfo,setCreditInfo] = useState()
  const [loanInfo,setLoanInfo] = useState()
  const activeAccount = Cookies.get("ActiveAccount");
  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  useEffect(()=>{
    console.log("hbgftre")
  })


  useEffect(()=>{
      const timeout = setTimeout(()=>{

        console.log("User: "+window.localStorage.getItem("User"))
        setUserInfo(JSON.parse(window.localStorage.getItem("User"))[0]);
        setDebitInfo(JSON.parse(window.localStorage.getItem("Debit")).filter((debit)=>debit?.accountNo==activeAccount)[0]);
        setCreditInfo(JSON.parse(window.localStorage.getItem("Credit")).filter((credit)=>credit?.accountNo==activeAccount)[0]);
        const timeout = setTimeout(()=>{
        setLoanInfo(JSON.parse(window.localStorage.getItem("Loan")).filter((loan)=>loan?.cardNo==debitInfo?.cardNo)[0]);
      },3000)
      return ()=>clearTimeout(timeout)
    },3000)

      return ()=>clearTimeout(timeout)
  },[])

  useEffect(()=>{
    console.log("user: "+user);
    console.log("debitInfo: "+debitInfo);
    console.log("creditInfo: "+creditInfo);
    console.log("loanInfo: " +loanInfo);
  },[user,debitInfo,loanInfo])

  return (
    <div>
         <div className='row' >
            <div className='card col-md-6 offset-md-3 offset-md-3' style={{'margin-top': '100px', marginBottom: '30px', marginLeft: "263px", width: "800px"}}>
               <div className='card-body' style={{display: "flex", flexDirection: "row", gap: "40px", width: "100%"}}>
                  <div style={{paddingTop: "100px"}}>
                    <Avatar src="/broken-image.jpg" style={{height: "150px", width: "150px" }} />
                    &nbsp;&nbsp;
                    <div >
                      <center><h4>{user&& user?.firstName}<br/>{user && user?.lastName}</h4></center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {/* <h5>Account No:</h5>
                      <h6>1234567890</h6> */}
                    </div>
                  </div>
                  <div>
                  <form >
                          <center><h4>Personal Details</h4></center><br/>
                          <div className='card-body' style={{display: "flex", flexDirection: "row", gap: "40px"}}>
                              <div>
                                  <div className="mb-3">
                                      <h6><label>Customer Id</label></h6>
                                    <input type="number" className="form-control" name="customerId" value={user?.customerId} placeholder="customerId" readOnly />
                                  </div>
                                  <div className="mb-3">
                                      <h6><label>Account No</label></h6>
                                    <input type="number" className="form-control" name="customerId" value={activeAccount} placeholder="accountNo" readOnly />
                                  </div>
                                  <div className="mb-3">
                                      <h6><label>First Name</label></h6>
                                    <input type="text" className="form-control" name="firstName" value={user?.firstName} onChange={handleInputChange} placeholder="firstName" readOnly/>
                                  </div>
                                  <div className="mb-3">
                                      <h6><label>Last Name</label></h6>
                                    <input type="text" className="form-control" name="lastname" value={user?.lastName} onChange={handleInputChange} placeholder="lastName" readOnly/>
                                  </div>

                              </div>
                              <div>
                                  <div className="mb-3">
                                      <h6><label>Email Id</label></h6>
                                    <input type="email" className="form-control" name="emailId" value={user?.emailId} onChange={handleInputChange} placeholder="emailId" readOnly/>
                                  </div>
                                  <div className="mb-3">
                                      <h6><label>Mobile No</label></h6>
                                    <input type="number" className="form-control" name="mobileNo" value={user?.mobileNumber} onChange={handleInputChange} placeholder="mobileNo" readOnly/>
                                  </div>
                                  <div className="mb-3">
                                      <h6><label>Pan Number</label></h6>
                                    <input type="text" className="form-control" name="panNo" value={user?.panNumber} onChange={handleInputChange} placeholder="panNo" readOnly/>
                                  </div>
                                  <div className="mb-3">
                                      <h6><label>Address</label></h6>
                                    <input type="textarea" className="form-control" name="address" value={user?.address} onChange={handleInputChange} placeholder="address" readOnly/>
                                  </div>
                              </div>
                           </div>
                             {/* <center><Button type="submit" >Save Changes</Button></center>  */}
                          </form>
                  </div>
               </div>
            </div>
         </div>

         {/*----------------------------------------------- Accordian      */}

         <div style={{width: "1000px",  marginLeft: "150px", marginBottom: "70px", alignItems: "center"}}>
          <Accordion >
            <Accordion.Item eventKey="0">
              <Accordion.Header className='AccordionHeader'><h5>Debit Cards</h5></Accordion.Header>
              <Accordion.Body>

                <div>
                            <ul style={{listStyleType: "none"}}>
                              <li><b>Debit Card Number:</b> {debitInfo?.cardNo}</li>
                              <li><b>Valid From:</b> {debitInfo?.validFrom}</li>
                              <li><b>Valid Upto:</b> {debitInfo?.validUpto}</li>
                              <li><b>CVV:</b> {debitInfo?.cvv}</li>
                              <li><b>Status:</b> {debitInfo?.status}</li>
                            </ul>
                  </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className='AccordionHeader'><h5>Credit Cards</h5></Accordion.Header>
              <Accordion.Body>

                <div>
                            <ul style={{listStyleType: "none"}}>
                              <li><b>Credit Card Number: </b> {creditInfo?.cardNo}</li>
                              <li><b>Valid From: </b> {creditInfo?.validFrom}</li>
                              <li><b>Valid Upto: </b> {creditInfo?.validUpto}</li>
                              <li><b>CVV: </b> {creditInfo?.cvv}</li>
                              <li><b>Credit Amount: </b> {creditInfo?.cvv}</li>
                              <li><b>Status: </b> {creditInfo?.status}</li>
                            </ul>
                  </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header className='AccordionHeader'><h5>Loans</h5></Accordion.Header>
              <Accordion.Body>
                <div >
                            <ul style={{listStyleType: "none"}}>
                              <li><b>Loan Id:</b> {loanInfo?.loanId}</li>
                              <li><b>Debit Card Number:</b> {loanInfo?.cardNo}</li>
                              <li><b>Loan Type:</b> {loanInfo?.loanType}</li>
                              <li><b>Total Loan:</b> {loanInfo?.totalLoanAmt}</li>
                              <li><b>Loan Tenure:</b> {loanInfo?.tenure}</li>
                              <li><b>Installment:</b> {loanInfo?.installment}</li>
                              <li><b>Interest Rate:</b> {loanInfo?.interestRate}</li>
                              <li><b>Balance amount:</b> {loanInfo?.balanceAmt}</li>
                              <li><b>Status:</b> {loanInfo?.status}</li>
                            </ul>

                        </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
    </div>
  )
}

export default Profile
