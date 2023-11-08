import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Chance} from 'chance';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import image from '../../img/debitbg.jpg';
import useUpdateCookies from '../../services/UpdateCookies';

function Applydebitcard() {

    const chance = new Chance();
    const loginStatus= Cookies.get("loginStatus");
    const navigate= useNavigate();
    const[accountNoErr,setAccountNoErr]=useState({});
    const[firstNameErr,setFirstNameErr]=useState({});
    const[lastNameErr,setLastNameErr]=useState({});
    const[emailIdErr,setEmailIdErr]=useState({});
    const[mobileNumberErr,setMobileNumberErr]=useState({});
    const {updateDebitCookies} = useUpdateCookies();
    const activeAccount = Cookies.get("ActiveAccount");
    const token = Cookies.get('token');
    useEffect(()=>{
      if(!loginStatus){
      navigate("/login") }
  },[])
  const [debitcardInfo, setdebitcardInfo] = useState();

  useEffect(()=>{
    const timeout = setTimeout(()=>{
    setdebitcardInfo({

    accountNo: activeAccount,
    firstName: JSON.parse(window.localStorage.getItem("User"))[0]?.firstName,
    lastName: JSON.parse(window.localStorage.getItem("User"))[0]?.lastName,
    emailId: JSON.parse(window.localStorage.getItem("User"))[0]?.emailId,
    mobileNumber: JSON.parse(window.localStorage.getItem("User"))[0]?.mobileNumber,
    status:'Waiting for approval'
    })
  },3000)
  return ()=>clearTimeout(timeout)
  },[])

  const generateRandomCreditCardNumber = () => {
    const prefix = '4'; // Assuming VISA cards for this example
    const cardLength = 16;
    const randomNumber = Math.floor(Math.random() * (Math.pow(10, cardLength - 1) - 1)) + 1;
    const cardNumber = prefix + randomNumber.toString().padStart(cardLength - 1, '0');
    return cardNumber;
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdebitcardInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formValidation()){
    const randomCardNo = generateRandomCreditCardNumber();
    const randomCVV = chance.integer({ min: 100, max: 999 }).toString();
    const randomValidFrom = chance.date({ string: true, year: new Date().getFullYear() });
    const randomValidUpto = chance.date({ string: true, year: new Date().getFullYear() + 5 });

      const debitCardData = {
      ...debitcardInfo,
      cardNo: randomCardNo,
      cvv: randomCVV,
      validFrom: randomValidFrom,
      validUpto: randomValidUpto,
      };
          axios.post('http://localhost:8080/api/user/applydebitcard', debitCardData ,
          {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
          })
            .then((response) => {
              // Handle success
              // updateDebitCookies(activeAccount);
              console.log(debitCardData);
              window.alert("Debit card applied");
              window.location.href = '/user';
            })
            .catch((error) => {
              // Handle error
              window.alert(error.response.data.message);
            });
          }//form validation
        }

    const formValidation = () => {
      const accountNoErr = {};
      const firstNameErr = {};
      const lastNameErr = {};
      const emailIdErr = {};
      const mobileNumberErr = {};

      let isValid = true;

      if(debitcardInfo?.accountNo.trim().length===0){
       accountNoErr.accountNoEmpty = "Account Number is required";
       isValid = false;
      } else if((debitcardInfo.accountNo.toString().length!==10)){
        accountNoErr.accountNolength = "Account Number should be 10 digits";
        isValid = false;
      }

      if(debitcardInfo.firstName.trim().length===0){
        firstNameErr.firstNameEmpty = "Account Number is required";
        isValid = false;
       }

       if(debitcardInfo.lastName.trim().length===0){
        lastNameErr.lastNameEmpty = "Account Number is required";
        isValid = false;
       }

       if(debitcardInfo.emailId.trim().length===0){
        emailIdErr.emailIdEmpty = "EmailId is required";
      isValid = false;
      }
      else if((debitcardInfo.emailId.endsWith("@gmail.com"))===false){
        emailIdErr.emailIdError = "@gmail.com is required";
        isValid = false;

      }
      if(debitcardInfo.mobileNumber.toString().length===0){
        mobileNumberErr.mobileNumberEmpty = "Mobile Number is required";
      isValid = false;
      }
      else if((debitcardInfo.mobileNumber.toString().length!==10)){
        mobileNumberErr.mobileNumberlength = "Mobile Number should be 10 digits";
        isValid = false;
      }
      setAccountNoErr(accountNoErr);
      setFirstNameErr(firstNameErr);
      setLastNameErr(lastNameErr);
      setEmailIdErr(emailIdErr);
      setMobileNumberErr(mobileNumberErr);
      return isValid;
    }

  return (
    <div>
    <div style={{ backgroundImage:`url(${image})`,backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position:"fixed",
    top:"30px",
    left:0,
    right:0,
    bottom:0,
    overflow: 'hidden',padding:"30px"}}>
            <div className='row' >
               <div className='card col-md-6 offset-md-3 offset-md-3' style={{'marginTop': '70px', marginBottom: '30px'}}>
                 <div className='card-body' >

                      <form onSubmit={handleSubmit}>
                          <center><h3 style={{fontFamily: 'Poppins', fontWeight: '600'}}>DEBIT CARD APPLICATION</h3></center><br/>

                           <div className="mb-3">
                             <h5><label>Account no</label></h5>
                             <input type="number" className="form-control" name="accountNo" value={debitcardInfo?.accountNo} onChange={handleChange} placeholder="accountNo" readOnly/>
                           </div>

                           {Object.keys(accountNoErr).map((key)=>{
                            return <div style={{color : "red"}}>{accountNoErr[key]}</div>
                            })}

                           <div className="mb-3">
                              <h5><label>First Name</label></h5>
                             <input type="text" className="form-control" name="firstName" value={debitcardInfo?.firstName} onChange={handleChange} placeholder="firstName"  readOnly/>
                           </div>

                           {Object.keys(firstNameErr).map((key)=>{
                            return <div style={{color : "red"}}>{firstNameErr[key]}</div>
                          })}

                           <div className="mb-3">
                              <h5><label>Last Name</label></h5>
                             <input type="text" className="form-control" name="lastName" value={debitcardInfo?.lastName} onChange={handleChange} placeholder="lastName"  readOnly/>
                           </div>

                           {Object.keys(lastNameErr).map((key)=>{
                            return <div style={{color : "red"}}>{lastNameErr[key]}</div>
                          })}

                             <div className="mb-3">
                                <h5><label>Email address</label></h5>
                             <input type="email" className="form-control" name="emailId" value={debitcardInfo?.emailId} onChange={handleChange} placeholder="emailId"   readOnly/>
                             </div>

                             {Object.keys(emailIdErr).map((key)=>{
                              return <div style={{color : "red"}}>{emailIdErr[key]}</div>
                            })}

                             <div className="mb-3">
                                <h5><label>Phone number</label></h5>
                             <input type="number" className="form-control" name="mobileNumber" value={debitcardInfo?.mobileNumber} onChange={handleChange} placeholder="mobileNumber"  readOnly/>
                             </div>

                             {Object.keys(mobileNumberErr).map((key)=>{
                              return <div style={{color : "red"}}>{mobileNumberErr[key]}</div>
                            })}

                            <center><Button type="submit" >Apply for debit card</Button></center>
                          </form>
                    </div>
                </div>
             </div>
         </div>
         </div>
  );
}

export default Applydebitcard;