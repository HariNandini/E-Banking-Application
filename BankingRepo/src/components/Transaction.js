import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Alert, Button } from 'react-bootstrap';
import useBankingServiceHooks from "../services/TransactionsService";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import useUpdateCookies from "../services/UpdateCookies";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 6 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Transaction() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {depositTransaction,debitWithDrawalTransaction, creditWithDrawalTransaction, getCreditBill, payCreditBill, transferTransaction,
        checkIfLoanExistsByLoanId, getLoanInstallment, payLoanTransaction} = useBankingServiceHooks();
    const {updateAccountCookies, updateDebitCookies, updateCreditCookies, updateLoanCookies} = useUpdateCookies();
    const [user, setUserInfo] = useState();
    const [activeAccount, setActiveAccount] = useState();
    const loginStatus= Cookies.get("loginStatus");
    const navigate=useNavigate();

        useEffect(()=>{
          if(loginStatus){
            const timeout = setTimeout(()=>{
              setActiveAccount(Cookies.get("ActiveAccount"))
              setUserInfo({
                accountNoFrom: activeAccount,
                accountNoTo: activeAccount==JSON.parse(window.localStorage.getItem("User"))[0]?.accountNo ? JSON.parse(window.localStorage.getItem("User"))[1]?.accountNo : JSON.parse(window.localStorage.getItem("User"))[0]?.accountNo,
                amount: '',
                debitNo: JSON.parse(window.localStorage.getItem("Debit")).filter((debit)=>debit?.accountNo==activeAccount)[0]?.cardNo,
                creditNo: JSON.parse(window.localStorage.getItem("Credit")).filter((credit)=>credit?.accountNo==activeAccount)[0]?.cardNo,
                loanId: activeAccount== JSON.parse(window.localStorage.getItem("Debit"))[0]?.accountNo ? JSON.parse(window.localStorage.getItem("Loan"))[0]?.loanId : JSON.parse(window.localStorage.getItem("Loan"))[1]?.loanId,
                creditBill: '',
              })
            },1000)

            return ()=>clearTimeout(timeout)}
            else
              navigate("/login");

        },[activeAccount])

        useEffect(()=>{
          console.log(user)
        },[user])
  const [showInstallment, setShowInstallment] = useState(false);
  const [showCreditBill, setShowCreditBill] = useState(false);

  useEffect(()=>{
    setShowInstallment(false)
    setShowCreditBill(false)
  },[setShowInstallment,setShowCreditBill])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    console.log(user?.accountNoFrom, user?.amount);
    depositTransaction(user?.accountNoFrom,user?.amount)
    .then((response) => {
      if(response.data===true)
      {   console.log("deposited");
          window.alert("Deposited successfully to Account Number: "+user?.accountNoFrom);
          setUserInfo((prevState) => ({
            ...prevState,
            amount: ''
          }));
          updateAccountCookies();
      }
      else
      {
        console.log("couldn't deposit");
        window.alert("Deposit unsuccessful. Please try again.");
        navigate('/');
      }
        })

      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  const handleDebitWithDrawalSubmit = (e) => {
    e.preventDefault();
    console.log(user?.debitNo, user?.amount);

    debitWithDrawalTransaction(user?.debitNo,user?.amount)
    .then((response) => {
      if(response.data===true)
      {   console.log("debit withDrawn");
          updateAccountCookies();
          window.alert("DebitWithdrawal successfull from Debit card: "+user?.debitNo);
          setUserInfo((prevState) => ({
            ...prevState,
            amount: ''
          }));
      }
      })
      .catch((error) => {
        console.error('Error:', error);
        window.alert(error.response.data.message);
        navigate('/');
      });
  };

  const handleCreditWithDrawalSubmit = (e) => {
    e.preventDefault();
    console.log(user?.creditNo, user?.amount);

    creditWithDrawalTransaction(user?.creditNo,user?.amount)
    .then((response) => {
      if(response.data===true)
      {
          updateCreditCookies(activeAccount);
          console.log("credit withDrawn");
          window.alert("creditWithdrawal successfull from credit card: "+user?.creditNo);
          setUserInfo((prevState) => ({
            ...prevState,
            amount: ''
          }));
      }
      })
      .catch((error) => {
        console.error('Error:', error);
        window.alert(error.response.data.message);
      });
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    console.log(user?.accountNoFrom,user?.accountNoTo, user?.amount);
    transferTransaction(user?.accountNoFrom,user?.accountNoTo,user?.amount)
    .then((response) => {
        updateAccountCookies();
        console.log("Transfered");
          window.alert("Transfer successfull from Account Number: "+user?.accountNoFrom+" to Account Number: "+user?.accountNoTo);
          setUserInfo((prevState) => ({
            ...prevState,
            amount: ''
          }));
        })
      .catch((error) => {
        console.error('Error:', error);
        window.alert(error.response.data.message);
      });
  };

  const handleGetCreditBill = (e) => {
    e.preventDefault();
    console.log(user?.creditNo);
          getCreditBill(user?.creditNo)
          .then((response) => {
              console.log(response.data);
              user.creditBill= response.data;
              setShowCreditBill(true);
            })
            .catch((error) => {
              console.error(error.response.data.message);

            });

        }

        const handlePayCreditBill = (e) => {
          e.preventDefault();
          payCreditBill(user?.creditNo, user?.accountNoFrom)
          .then((response)=> {
            updateAccountCookies();
            updateCreditCookies(activeAccount);
            console.log("Credit Bill payment successful.");
            window.alert("Payment successfull");
            setUserInfo((prevState) => ({
              ...prevState,
              creditBill: ''
            }));
            showCreditBill = false;
          } )
          .catch((error) => {
            console.log("Error : "+error);
            window.alert(error.response.data.message);
              navigate('/');
          });
        };

  const handleGetInstallment = (e) => {
    e.preventDefault();
    console.log(user?.loanId);
    checkIfLoanExistsByLoanId(user?.loanId)
    .then((response)=> {
          getLoanInstallment(user?.loanId)
          .then((response) => {
              console.log(response.data);
              user.loanInstallment= response.data;
              setShowInstallment(true);
              console.log("show installment = " + showInstallment);
            })

            .catch((error) => {
              console.error('Error:', error);
              window.alert(error.response.data.message);
              navigate('/');
            });
    } )
    .catch((error) => {
      console.error('Error:', error);
      window.alert(error.response.data.message);
      navigate('/');
    });
  }

  const handlePayInstallment = (e) => {
    e.preventDefault();
    payLoanTransaction(user?.loanId, user?.accountNoFrom)
    .then((response)=> {
      updateLoanCookies(activeAccount);
      updateAccountCookies();
        console.log("Installment payment successful.");
          window.alert("Payment successfull");
    })
    .catch((error) => {
      console.error('Error:', error);
      window.alert(error.response.data.message);
      navigate('/');
    });
  };

  return (
    <Box sx={{ width: '90%', marginTop: "100px", marginLeft: "100px", border: "2px solid black", marginBottom: "70px"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant='fullWidth'
        >
          <Tab label="Deposit" {...a11yProps(0)} />
          <Tab label="Debit Withdrawal" {...a11yProps(1)} />
          <Tab label="Credit Withdrawal" {...a11yProps(2)} />
          <Tab label="Pay Credit Bill" {...a11yProps(3)} />
          <Tab label="Transfer" {...a11yProps(4)} />
          <Tab label="Pay Loan Installment" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className='row' >
            <div className='card col-md-6 offset-md-3 offset-md-3' style={{marginTop: '40px', marginBottom: '70px'}}>
                 <div className='card-body'>
                    <form onSubmit={handleDepositSubmit}>
                        <center><h3>Deposit</h3></center><br/>
                        <div className="mb-3">
                            <label><h6>Account No: </h6></label>
                            <input type="number" className="form-control" name="accountNo" value={user?.accountNoFrom} onChange={handleInputChange} placeholder="account No" readOnly/>
                        </div>
                        <div className="mb-3">
                            <label><h6>Amount (to deposit): </h6></label>
                            <input type="number" className="form-control" name="amount" value={user?.amount} onChange={handleInputChange} placeholder="Amount" required />
                        </div>
                        <center><Button type="submit" >Deposit</Button></center>
                    </form>
                </div>
            </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className='row' >
                <div className='card col-md-6 offset-md-3 offset-md-3' style={{marginTop: '40px', marginBottom: '70px'}}>
                    <div className='card-body'>
                        <form onSubmit={handleDebitWithDrawalSubmit}>
                            <center><h3>Payment through debit</h3></center><br/>
                            <div className="mb-3">
                                <label><h6>Debit Card No: </h6></label>
                                <input type="number" className="form-control" name="debitNo" value={user?.debitNo} onChange={handleInputChange} placeholder="debitCardNo" readOnly/>
                            </div>
                            <div className="mb-3">
                                <label><h6>Amount (to Pay): </h6></label>
                                <input type="number" className="form-control" name="amount" value={user?.amount} onChange={handleInputChange} placeholder="amount" required/>
                            </div>
                            <center><Button type="submit" >Pay</Button></center>
                        </form>
                    </div>
                </div>
            </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className='row' >
                <div className='card col-md-6 offset-md-3 offset-md-3' style={{marginTop: '40px', marginBottom: '70px'}}>
                    <div className='card-body'>
                        <form onSubmit={handleCreditWithDrawalSubmit}>
                            <center><h3>Payment through credit</h3></center><br/>
                            <div className="mb-3">
                                <label><h6>Credit Card No: </h6></label>
                                <input type="number" className="form-control" name="creditNo" value={user?.creditNo} onChange={handleInputChange} placeholder="creditCardNo" readOnly/>
                            </div>
                            <div className="mb-3">
                                <label><h6>Amount (to Pay): </h6></label>
                                <input type="number" className="form-control" name="amount" value={user?.amount} onChange={handleInputChange} placeholder="amount" required/>
                            </div>
                            <center><Button type="submit" >Pay</Button></center>
                        </form>
                    </div>
                </div>
            </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className='row' >
                <div className='card col-md-6 offset-md-3 offset-md-3' style={{marginTop: '40px', marginBottom: '70px'}}>
                    <div className='card-body'>
                        <form onSubmit={handlePayCreditBill}>
                            <center><h3>Pay Credit Bill</h3></center><br/>
                            <div className="mb-3">
                                <label><h6>Credit Card Number:</h6></label>
                                <input type="number" className="form-control" name="creditNo" value={user?.creditNo} onChange={handleInputChange} placeholder="Enter Credit Card No" required/>
                            </div>
                            { !showCreditBill &&
                              <>
                                <center><Button onClick={handleGetCreditBill} >Get Bill</Button></center>
                              </>
                            }
                            { showCreditBill &&
                              <>
                                  <div className="mb-3">
                                      <label><h6>Credit Bill:</h6></label>
                                      <input type="number" className="form-control" name="creditbill" value={user?.creditBill} onChange={handleInputChange} />
                                  </div>
                                  <div className="mb-3">
                                      <label><h6>Enter Account No to pay:</h6></label>
                                      <input type="number" className="form-control" name="accountNoFrom" value={user?.accountNoFrom} onChange={handleInputChange} placeholder="enter account no" min="10" max="10" required readOnly/>
                                  </div>
                                  <center><Button onClick={handlePayCreditBill}>Pay Bill</Button></center>

                              </>
                            }
                        </form>
                    </div>
                </div>
            </div>
      </TabPanel>
      <TabPanel value={value} index={4}>

        <div className='row' >

                <div className='card col-md-6 offset-md-3 offset-md-3' style={{marginTop: '40px', marginBottom: '70px'}}>

                    <div className='card-body'>

                        <form onSubmit={handleTransferSubmit}>

                            <center><h3>Transfer</h3></center><br/>

                            <div className="mb-3">

                                <label><h6>From Account No: </h6></label>

                                <input type="number" className="form-control" name="accountNo" value={user?.accountNoFrom} onChange={handleInputChange} placeholder="account No From" readOnly/>

                            </div>

                            <div className="mb-3">

                                <label><h6>To Account No: </h6></label>

                                <input type="text" className="form-control" name="accountNoTo" value={user?.accountNoTo} onChange={handleInputChange} placeholder="Account No To" minLength={10} maxLength={10} required />

                            </div>

                            <div className="mb-3">

                                <label><h6>Amount (to transfer): </h6></label>

                                <input type="number" className="form-control" name="amount" value={user?.amount} onChange={handleInputChange} placeholder="Amount"  required/>

                            </div>

                            <center><Button type="submit" >Transfer</Button></center>

                        </form>

                    </div>

                </div>

            </div>

      </TabPanel>
      <TabPanel value={value} index={5}>
        <div className='row' >
                <div className='card col-md-6 offset-md-3 offset-md-3' style={{marginTop: '40px', marginBottom: '70px'}}>
                    <div className='card-body'>
                        <form onSubmit={handlePayInstallment}>
                            <center><h3>Pay Loan Installment</h3></center><br/>
                            <div className="mb-3">
                                <label><h6>Enter Loan Id:</h6></label>
                                <input type="number" className="form-control" name="loanId" value={user?.loanId} onChange={handleInputChange} placeholder="enter Loan Id" required/>
                            </div>
                            { !showInstallment &&
                              <>
                                <center><Button onClick={handleGetInstallment} >Check Installment</Button></center>
                              </>
                            }
                            { showInstallment &&
                              <>
                                  <div className="mb-3">
                                      <label><h6>Installment:</h6></label>
                                      <input type="number" className="form-control" name="loanInstallment" value={user?.loanInstallment} onChange={handleInputChange} />
                                  </div>
                                  <div className="mb-3">
                                      <label><h6>Enter Account No to pay:</h6></label>
                                      <input type="number" className="form-control" name="accountNoFrom" value={user?.accountNoFrom} onChange={handleInputChange} placeholder="enter account no" min="10" max="10" required/>
                                  </div>
                                  <center><Button onClick={handlePayInstallment}>Pay</Button></center>

                              </>
                            }
                        </form>
                    </div>
                </div>
            </div>
      </TabPanel>
    </Box>
  );
}