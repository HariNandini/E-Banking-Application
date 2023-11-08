import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import UseCreditapprovalServiceHooks from '../../services/CreditApprovalsService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function CreditApprovals() {

    const navigate = useNavigate();
    const [CreditapprovalsInfo, setCreditapprovalsInfo] = useState([])
    const [CreditapprovedInfo, setCreditapprovedInfo] = useState([])

    const {getCreditapprovalHistory,getCreditapprovedHistory,creditUpdatestatus}=UseCreditapprovalServiceHooks()

    const [adminLoginStatus, setAdminLoginStatus] = useState(false);
    useEffect(()=>{
        const timeout = setTimeout(()=>{
        setAdminLoginStatus(Cookies.get("AdminLoginStatus"))
        },1000)
        return ()=>clearTimeout(timeout)
    },[])

    function fetchAllCreditapprovals(){
        getCreditapprovalHistory()
        .then((res)=>{
            console.log(res.data);
            setCreditapprovalsInfo(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    function fetchAllCreditapproved(){

        getCreditapprovedHistory()

        .then((res)=>{
            console.log(res.data);
            setCreditapprovedInfo(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        const timeout = setTimeout(()=>{
            if(adminLoginStatus)
            {
                fetchAllCreditapprovals()
                fetchAllCreditapproved()
            }
            else
                navigate('/login');
        },3000)
        return ()=>clearTimeout(timeout)

    },[adminLoginStatus])

    const handleSubmit = (creditapproval) => {

        console.log("submitted.."+creditapproval.cardNo);
        function updateApprovalStatus(){

            creditUpdatestatus(creditapproval).then(res=> {
                if(res.data===true)
                {
                    window.location.href= '/admindashboard/CreditapprovalsHistory';
                    console.log("credit approved");
                }
               })

               .catch((error) => {
                console.error('Error:', error.response.data.message);
              });
        }
        updateApprovalStatus()
      };

  return (
    <div style={{marginTop:"100px", marginBottom: '200px'}}>
        <center><h2> Credit Approvals History</h2></center><br></br>
        <center><h2>In Progress Approvals</h2></center><br></br>

        <div>
            <Table className="print" striped style={{backgroundColor: "white", border: "2px"}}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>cardNo</th>
                    <th>accountNo</th>
                    <th>income</th>
                    <th>creditAmount</th>
                    <th>Status</th>

                </tr>
            </thead>
            <tbody>
            {
                CreditapprovalsInfo.map((creditapproval,
                    idx) =>
                        <tr>
                            <td>{idx+1}</td>
                            <td>{creditapproval.firstName}</td>
                            <td>{creditapproval.lastName}</td>
                            <td>{creditapproval.cardNo}</td>
                            <td>{creditapproval.accountNo}</td>
                            <td>{creditapproval.income}</td>
                            <td>{creditapproval.creditAmount}</td>
                            <button onClick={()=>handleSubmit(creditapproval)}>
                                <td>Approve</td>
                            </button>

                        </tr>
                )
            }
            </tbody>
            </Table>
        </div>
        <center><h2>Approved details</h2></center><br></br>
        <div>
            <Table className="print" striped style={{backgroundColor: "white", border: "2px"}}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>cardNo</th>
                    <th>accountNo</th>
                    <th>income</th>
                    <th>creditAmount</th>
                    <th>Status</th>

                </tr>
            </thead>
            <tbody>
            {
                CreditapprovedInfo.map((creditapproved,
                    idx) =>
                        <tr>
                            <td>{idx+1}</td>
                            <td>{creditapproved.firstName}</td>
                            <td>{creditapproved.lastName}</td>
                            <td>{creditapproved.cardNo}</td>
                            <td>{creditapproved.accountNo}</td>
                            <td>{creditapproved.income}</td>
                            <td>{creditapproved.creditAmount}</td>
                            <td>{creditapproved.status}</td>

                        </tr>
                )
            }
            </tbody>
            </Table>
        </div>
    </div>
  )
}

export default CreditApprovals