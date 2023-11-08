import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import UseTransactionsService from "../services/TransactionsService";
import Cookies from 'js-cookie';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import {useNavigate } from 'react-router-dom';

function TransactionHistory() {
    const [transactions, setTransactions] = useState([])
    const {getTransactionHistory} = UseTransactionsService()
    const [user, setUserInfo] = useState();
    const loginStatus= Cookies.get("loginStatus");
    const navigate=useNavigate();

        useEffect(()=>{
            if(loginStatus){
           const timeout = setTimeout(()=>{
              setUserInfo(JSON.parse(window.localStorage.getItem("User")))
            },1000)

            return ()=>clearTimeout(timeout)}
            else
                navigate("/login");

        },[loginStatus])

        useEffect(()=>{
          console.log(user)
        },[user])
    useEffect(() => {

        function fetchAllTransactions(){
            getTransactionHistory(Cookies.get("ActiveAccount"))
            .then((res)=>{
                console.log(res.data);
                setTransactions(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        if(loginStatus)
        fetchAllTransactions()
    },[loginStatus])

    // function saveDiv() {
    //     var doc = new jsPDF({orientation:"portrait",format:"a4",unit:"mm"});
    //     const table = document.getElementById("trans_table")
    //     const tableWidth = doc.internal.pageSize.width - 20; 

    //     const columnWidths = Array.from(table.rows[0].cells).map(cell => cell.clientWidth / table.clientWidth * tableWidth);

    //     const originalFontSize = window.getComputedStyle(table).fontSize;const scaleFactor = tableWidth / table.clientWidth;const fontSize = parseFloat(originalFontSize) * scaleFactor;

    //     doc.autoTable({html: table,startY: 10,tableWidth: tableWidth,columnWidth: columnWidths,styles: { fontSize: fontSize }});
    //     doc.save("table.pdf")
    // }
    const print=()=>{
        window.print();
    }
  return (
    <div style={{marginTop:"100px", marginBottom: '150px'}}>
        <center><h2>Transaction History</h2></center><br></br>
        <div style={{float: 'right'}}>
            <h5>Account No: {Cookies.get("ActiveAccount")}</h5>
        </div>
        <div  >
            <Table id="trans_table" className="print" striped style={{backgroundColor: "white", border: "2px"}}>
            <thead>
                <tr>
                    <th>Transaction Id</th>
                    <th>Transaction Type</th>
                    <th>Amount</th>
                    <th>Receiver Account</th>
                    <th>Status</th>
                    <th>Created_at</th>
                </tr>
            </thead>
            <tbody>
            {
                transactions.map((transaction,
                    idx) =>
                        <tr>
                            <td>{transaction.transaction_id}</td>
                            <td>{transaction.transactionType}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.to_account}</td>
                            <td>{transaction.transactionStatus}</td>
                            <td>{transaction.createdDate}</td>
                        </tr>
                )
            }
            </tbody>
            </Table>
        </div>
        <center><Button onClick={print}>Print </Button></center>
        {/* <center><Button onClick={()=>saveDiv()}>Print </Button></center> */}
    </div>
  )
}

export default TransactionHistory