import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Chance} from 'chance';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import image from '../../img/credit-1.jpg';
import {ImProfile} from 'react-icons/im';
import {AiOutlineLaptop,AiOutlineFieldTime} from 'react-icons/ai';
import {FaHandHolding} from 'react-icons/fa';
import {FcDataProtection} from 'react-icons/fc';
import {BsFillPersonLinesFill} from 'react-icons/bs';
import {TiTickOutline} from 'react-icons/ti';
import {FiGift} from 'react-icons/fi';
import useUpdateCookies from '../../services/UpdateCookies';

function Applycreditcard() {
const chance = new Chance();
    const loginStatus= Cookies.get("loginStatus");
    const navigate= useNavigate();
    const [user,setUserInfo] = useState();
    const [income, setIncome] = useState();
    const [creditAmt, setCreditAmount] = useState();
    const [onClickApplyCD,setOnClickApplyCD] = useState(false)
    // const[accountNoErr,setAccountNoErr]=useState({});
    // const[firstNameErr,setFirstNameErr]=useState({});
    // const[lastNameErr,setLastNameErr]=useState({});
    // const[emailIdErr,setEmailIdErr]=useState({});
    // const[mobileNumberErr,setMobileNumberErr]=useState({});
    const[incomeErr,setIncomeErr]=useState({});
    const token = Cookies.get('token');
    const activeAccount = Cookies.get("ActiveAccount");
    const {updateCreditCookies} = useUpdateCookies();

    useEffect(()=>{
      if(onClickApplyCD){
        console.log(user)
        axios.post('http://localhost:8080/api/user/applycreditcard', user,{
          headers: {
            Authorization: 'Bearer ' + token 
          }
        })
              .then((res) => {
                // Handle success
                updateCreditCookies(activeAccount);
                window.alert("Credit Card Applied");
                navigate('/');
              })
              .catch((error) => {
                // Handle error
                window.alert(error.response.data.message);
              });
      }
    },[onClickApplyCD])

  useEffect(()=>{

    if(loginStatus && income)

    {
      if (income >= 200000) {
      setCreditAmount(300000);
        }
    else if (income>=100000 && income < 200000 ) {
          setCreditAmount(150000);
         }
    else if (income>=50000 && income < 100000 ) {
         setCreditAmount(100000);
        }
    else if (income>=30000 && income<50000)
     {
      setCreditAmount(50000);
     }
     else if (income>=15000 && income<30000)  {
          setCreditAmount(30000);
        }
    }
      else if(!loginStatus)
          navigate("/login")
    },[income])

    useEffect(() => {
      const timeout = setTimeout(() => {
        setUserInfo({
          accountNo: activeAccount,
          firstName: JSON.parse(window.localStorage.getItem("User"))[0]?.firstName,
          lastName: JSON.parse(window.localStorage.getItem("User"))[0]?.lastName,
          emailId: JSON.parse(window.localStorage.getItem("User"))[0]?.emailId,
          mobileNumber: JSON.parse(window.localStorage.getItem("User"))[0]?.mobileNumber,
          status: 'Waiting for approval',
        });
      },3000);
    
      return () => clearTimeout(timeout);
    }, [creditAmt]);
    

    const generateRandomCreditCardNumber = () => {
    const prefix = '4'; // Assuming VISA cards for this example
    const cardLength = 16;
    const randomNumber = Math.floor(Math.random() * (Math.pow(10, cardLength - 1) - 1)) + 1;
    const cardNumber = prefix + randomNumber.toString().padStart(cardLength - 1, '0');
    return cardNumber;
    };

  const handleSubmit = (e) => {
    console.log("entered");
    e.preventDefault();
    if(formValidation()){
        const randomCardNo = generateRandomCreditCardNumber();
        const randomCVV = chance.integer({ min: 100, max: 999 }).toString();
        const randomValidFrom = chance.date({ string: true, year: new Date().getFullYear() });
        const randomValidUpto = chance.date({ string: true, year: new Date().getFullYear() + 5 });
        console.log("credit: ", user);
        setUserInfo((prevState) => ({
          ...prevState,
          income: income,
          creditAmount: creditAmt,
          creditBalance: creditAmt,
          cardNo: randomCardNo,
          cvv: randomCVV,
          // pinNo: '',
          validFrom: randomValidFrom,
          validUpto: randomValidUpto,
        }));
        setOnClickApplyCD(!onClickApplyCD)
        console.log("credit: ", user);
      }
    };

    const formValidation = () => {
      // const accountNoErr = {};
      // const firstNameErr = {};
      // const lastNameErr = {};
      // const emailIdErr = {};
      // const mobileNumberErr = {};
      const incomeErr ={};
      // const creditAmountErr = {};
      let isValid = true;
      // if(accountNo.trim().length===0){
      //  accountNoErr.accountNoEmpty = "Account Number is required";
      //  isValid = false;
      // } else if((accountNo.toString().length!==10)){
      //   accountNoErr.accountNolength = "Account Number should be 10 digits";
      //   isValid = false;
      // }
      // if(firstName.trim().length===0){
      //   firstNameErr.firstNameEmpty = "Account Number is required";
      //   isValid = false;
      //  }
      //  if(lastName.trim().length===0){
      //   lastNameErr.lastNameEmpty = "Account Number is required";
      //   isValid = false;
      //  }
      //  if(emailId.trim().length===0){
      //   emailIdErr.emailIdEmpty = "EmailId is required";
      // isValid = false;
      // }
      // else if((emailId.endsWith("@gmail.com"))===false){
      //   emailIdErr.emailIdError = "@gmail.com is required";
      //   isValid = false;
      // }
      // if(mobileNumber.trim().length===0){
      //   mobileNumberErr.mobileNumberEmpty = "Mobile Number is required";
      // isValid = false;
      // }
      // else if((mobileNumber.toString().length!==10)){
      //   mobileNumberErr.mobileNumberlength = "Mobile Number should be 10 digits";
      //   isValid = false;
      // }
      if(income.trim().length===0){
        incomeErr.incomeEmpty = "Income is required";
        isValid = false;
      }
      // setAccountNoErr(accountNoErr);
      // setFirstNameErr(firstNameErr);
      // setLastNameErr(lastNameErr);
      // setEmailIdErr(emailIdErr);
      // setMobileNumberErr(mobileNumberErr);
      setIncomeErr(incomeErr);
      return isValid;
    }

  return (
    <div>
    <center><h2 style={{'marginTop':'6rem'}}>Credit Card Application</h2></center>
    <div style={{display:'flex'}} >
     <div style={{flex:'1'}}>
    <h4 style={{marginTop:'20px',marginLeft:'130px', marginRight: '130px'}}>Let's get Started!</h4>
     <div className='row' >
    <div className='card col-md-8 offset-md-6 offset-md-6' style={{marginTop: '10px', marginBottom: '80px',marginLeft:'50px',width:'100%'}}>
      <div className='card-body' >
          <form onSubmit={handleSubmit}>
              {/*<center><h3 style={{fontFamily: 'Poppins', fontWeight: '600'}}>CREDIT CARD APPLICATION</h3></center><br/>*/}
                <div className="mb-3">
                  <h5><label>Account no</label></h5>
                  <input type="number" className="form-control" name="accountNo" value={user?.accountNo}  placeholder="accountNo" readOnly/>
                </div>
                {/* {Object.keys(accountNoErr).map((key)=>{
                 return <div style={{color : "red"}}>{accountNoErr[key]}</div>
                 })} */}
                <div className="mb-3">
                   <h5><label>First Name</label></h5>
                  <input type="text" className="form-control" name="firstName" value={user?.firstName}  placeholder="firstName" readOnly/>
                </div>
                {/* {Object.keys(firstNameErr).map((key)=>{
                 return <div style={{color : "red"}}>{firstNameErr[key]}</div>
               })} */}
                <div className="mb-3">
                   <h5><label>Last Name</label></h5>
                  <input type="text" className="form-control" name="lastName" value={user?.lastName} placeholder="lastName" readOnly/>
                </div>
                {/* {Object.keys(lastNameErr).map((key)=>{
                 return <div style={{color : "red"}}>{lastNameErr[key]}</div>
               })} */}
                  <div className="mb-3">
                     <h5><label>Email address</label></h5>
                  <input type="email" className="form-control" name="emailId" value={user?.emailId} placeholder="emailId"  readOnly/>
                  </div>
                  {/* {Object.keys(emailIdErr).map((key)=>{
                   return <div style={{color : "red"}}>{emailIdErr[key]}</div>
                 })} */}
                  <div className="mb-3">
                     <h5><label>Phone number</label></h5>
                  <input type="number" className="form-control" name="mobileNumber" value={user?.mobileNumber} placeholder="mobileNumber" readOnly/>
                  </div>
                  {/* {Object.keys(mobileNumberErr).map((key)=>{
                   return <div style={{color : "red"}}>{mobileNumberErr[key]}</div>
                 })} */}
                 <div className="mb-3">
                 <h5><label>Income(Monthly)</label></h5>
                     <input
                         type="number"
                         className="form-control"
                         placeholder="Enter Monthly Income"
                         min={15000}
                        //  max={2000000}
                         value={income}
                         onChange={(e)=>setIncome(e.target.value)}
                         />
                   </div>
                     {Object.keys(incomeErr).map((key)=>{
                      return <div style={{color : "red"}}>{incomeErr[key]}</div>
                    })}
                    <div className="mb-3">
                    <h5>Estimated Credit Amount: Rs- </h5> {creditAmt}
                     </div><br/>
                <center><Button type="submit" class="btn btn-dark" >Apply for Credit card</Button></center>
               </form>
         </div>
     </div>
  </div>
  </div>
  <div style={{'flex':'1',marginTop:'50px',marginLeft:'200px',marginBottom: '100px'}}>

<img

height={400} width={500}  alt="First slide"

src={image}

/>



<AiOutlineLaptop style={{fontSize:'60px',marginTop:'30px',marginRight:'400px'}}/>

<TiTickOutline style={{fontSize:'30px',marginTop:'47px', marginLeft: '-406px'}}/>

<br></br>

   <h5 style={{'position':'absolute',right:"362px",top: '624px','font-size': '1.2rem'}}>SAFETY AND SECURITY</h5>

   <p style={{'position':'absolute',right:"319px",top: '648px'}}>Security of a chip card to protect</p>

    <br></br>

    <br></br>

      <FiGift style={{'position':'absolute',fontSize:'30px',top:'722px',right:'600px'}}/>

      <FaHandHolding style={{'position':'absolute',fontSize:'60px',top:'719px',left:'868px'}}/>

      <br></br>

            <h5 style={{'position':'absolute',right:"472px",top: '725px','font-size': '1.2rem'}}>REWARDS</h5>

            <p style={{'position':'absolute',right:"312px",top: '746px'}}>Allows you to earn reward points </p>

      <br></br>

      <br></br>

      <AiOutlineFieldTime style={{'position':'absolute',fontSize:'60px',top:'817px',left:'867px'}}/>

      <br></br>

            <h5 style={{'position':'absolute',right:"387px",top: '814px','font-size': '1.2rem'}}>LIFESTYLE BENEFITS</h5>

            <p style={{'position':'absolute',right:"165px",top: '837px'}}>Enjoy Discounts on Shopping,movies,dining and more</p>

    </div>
    </div>
    </div>
  )
}
export default Applycreditcard