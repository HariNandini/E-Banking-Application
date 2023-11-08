import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import UseDebitapprovalServiceHooks from '../../services/DebitapprovalsService';
import Cookies from 'js-cookie';

function DebitApprovals() {
    const [DebitapprovalsInfo, setDebitapprovalsInfo] = useState([])
    const [DebitapprovedInfo, setDebitapprovedInfo] = useState([])
    const {getDebitapprovalHistory,getDebitapprovedHistory,updatestatus}=UseDebitapprovalServiceHooks()

    const navigate = useNavigate();
    const [adminLoginStatus, setAdminLoginStatus] = useState(false);
    useEffect(()=>{
        const timeout = setTimeout(()=>{
        setAdminLoginStatus(Cookies.get("AdminLoginStatus"))

        },1000)
        return ()=>clearTimeout(timeout)
    },[])

    useEffect(() => {
        function fetchAllDebitapprovals(){

            getDebitapprovalHistory()

            .then((res)=>{
                console.log(res.data);
                setDebitapprovalsInfo(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        function fetchAllDebitapproved(){

            getDebitapprovedHistory()

            .then((res)=>{
                console.log(res.data);
                setDebitapprovedInfo(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        console.log(adminLoginStatus);
        const timeout = setTimeout(()=>{
        if(adminLoginStatus)
        {
            fetchAllDebitapprovals()
            fetchAllDebitapproved()
        }
        else
            navigate('/login');
        },3000)
        return ()=>clearTimeout(timeout)
    },[adminLoginStatus])

    const handleSubmit = (debitapproval) => {

        console.log("submitted.."+debitapproval.TablecardNo);
        function updateApprovalStatus(){

            updatestatus(debitapproval).then(res=> {
                if(res.data===true)
                {
                    window.location.href= '/admindashboard/DebitapprovalsHistory';
                  console.log("debit approved");
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
        <center><h2>Debit Approvals History</h2></center><br></br>
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
                    <th>Status</th>

                </tr>
            </thead>
            <tbody>
            {
                DebitapprovalsInfo.map((debitapproval,
                    idx) =>
                        <tr>
                            <td>{idx+1}</td>
                            <td>{debitapproval.firstName}</td>
                            <td>{debitapproval.lastName}</td>
                            <td>{debitapproval.cardNo}</td>
                            <td>{debitapproval.accountNo}</td>
                            <button onClick={()=>handleSubmit(debitapproval)}>
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
                    <th>accountNo</th>
                    <th>Status</th>

                </tr>
            </thead>
            <tbody>
            {
                DebitapprovedInfo.map((debitapproved,
                    idx) =>
                        <tr>
                            <td>{idx+1}</td>
                            <td>{debitapproved.firstName}</td>
                            <td>{debitapproved.lastName}</td>
                            <td>{debitapproved.cardNo}</td>
                            <td>{debitapproved.accountNo}</td>
                            <td>{debitapproved.status}</td>

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

export default DebitApprovals