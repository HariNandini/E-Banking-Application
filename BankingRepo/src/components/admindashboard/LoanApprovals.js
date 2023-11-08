import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import UseLoanapprovalServiceHooks from '../../services/LoanapprovalsService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Loanapprovals() {
    const [LoanapprovalsInfo, setLoanapprovalsInfo] = useState([])
    const [LoanapprovedInfo, setLoanapprovedInfo] = useState([])
    const {getLoanapprovalHistory,getLoanapprovedHistory,updateLoanstatus}=UseLoanapprovalServiceHooks()

    const navigate = useNavigate();
    const [adminLoginStatus, setAdminLoginStatus] = useState(false);
    useEffect(()=>{
        const timeout = setTimeout(()=>{
        setAdminLoginStatus(Cookies.get("AdminLoginStatus"))

        },1000)
        return ()=>clearTimeout(timeout)
    },[])

    useEffect(() => {
        function fetchAllLoanapprovals(){

            getLoanapprovalHistory()

            .then((res)=>{
                console.log(res.data);
                setLoanapprovalsInfo(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        function fetchAllLoanapproved(){

            getLoanapprovedHistory()
            .then((res)=>{
                console.log(res.data);
                setLoanapprovedInfo(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        const timeout = setTimeout(()=>{
            if(adminLoginStatus)
            {
                fetchAllLoanapprovals()
                fetchAllLoanapproved()
            }
            else
                navigate('/login');
        },3000)
        return ()=>clearTimeout(timeout)
    },[adminLoginStatus])

    const handleSubmit = (cardNo) => {

        console.log("submitted.."+cardNo);
        function updateApprovalStatus(){

            updateLoanstatus(cardNo).then(res=> {
                console.log("response: "+res.data)
                if(res.data)
                {
                    window.location.href= '/admindashboard/LoanapprovalsHistory';
                  console.log("Loan approved");
                }
               })

               .catch((error) => {
                console.error('Error:', error);
              });
        }
        updateApprovalStatus()
      };
  return (
    <div style={{marginTop:"100px", marginBottom: '200px'}}>
        <center><h2>Loan Approvals History</h2></center><br></br>
        <center><h2>In Progress Approvals</h2></center><br></br>

        <div>
            <Table className="print" striped style={{backgroundColor: "white", border: "2px"}}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>cardNo</th>
                    <th>Total Loan amount</th>
                    <th>Status</th>

                </tr>
            </thead>
            <tbody>
            {
                LoanapprovalsInfo.map((Loanapproval,
                    idx) =>
                        <tr>
                            <td>{idx+1}</td>
                            <td>{Loanapproval.firstName}</td>
                            <td>{Loanapproval.lastName}</td>
                            <td>{Loanapproval.cardNo}</td>
                            <td>{Loanapproval.totalLoanAmt}</td>
                            <button onClick={()=>handleSubmit(Loanapproval.cardNo)}>
                                <td>Approve</td>
                            </button>

                        </tr>
                )
            }
            </tbody>
            </Table>
        </div>
        {/* <center><Button onClick={print}>Print </Button></center> */}
        <center><h2>Approved details</h2></center><br></br>
        <div>
            <Table className="print" striped style={{backgroundColor: "white", border: "2px"}}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>cardNo</th>
                    <th>Total Loan amount</th>
                    <th>Status</th>

                </tr>
            </thead>
            <tbody>
            {
                LoanapprovedInfo.map((Loanapproved,
                    idx) =>
                        <tr>
                            <td>{idx+1}</td>
                            <td>{Loanapproved.firstName}</td>
                            <td>{Loanapproved.lastName}</td>
                            <td>{Loanapproved.cardNo}</td>
                            <td>{Loanapproved.totalLoanAmt}</td>
                            <td>{Loanapproved.status}</td>

                        </tr>
                )
            }
            </tbody>
            </Table>
        </div>
        {/* <center><Button onClick={print}>Print </Button></center> */}
    </div>
  )
}

export default Loanapprovals