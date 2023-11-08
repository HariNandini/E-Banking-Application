import React,{useState,useEffect} from 'react'
import {Button} from 'react-bootstrap';
import {BsGraphUpArrow,BsClockHistory} from 'react-icons/bs';
import {HiCurrencyRupee} from 'react-icons/hi';
import {FaThumbsUp} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useLoanService from '../../services/LoanService';
import Cookies from 'js-cookie';
import useUpdateCookies from '../../services/UpdateCookies';

const ApplyLoan = ()=> {
  const [totalLoanAmt,setTotalLoanAmt] = useState('');
  const [tenure,setTenure] = useState('');
  const [interestRate,setInterestRate]= useState(0);
  const [installment,setInstallment]= useState('');
  const [balanceAmt,setBalanceAmt] = useState('');
  const navigate=useNavigate();
  const {addLoan} = useLoanService();
  const loginStatus= Cookies.get("loginStatus");
  const [user,setUserInfo] = useState();
  const activeAccount = Cookies.get("ActiveAccount");

  // form
  // const[loanTypeErr,setLoanTypeErr]=useState({});
  const[firstNameErr,setFirstNameErr]=useState({});
  const[lastNameErr,setLastNameErr]=useState({});
  const[cardNoErr,setCardNoErr]=useState({});
  const[totalLoanAmtErr,setTotalLoanAmtErr]=useState({});
  const[tenureErr,setTenureErr]=useState({});
  // const[interestRateErr,setInterestRateErr]=useState({});
  // const[installmentErr,setInstallmentErr]=useState({});
  // const[balanceAmtErr,setBalanceAmtErr]=useState({});

    const {updateLoanCookies} = useUpdateCookies();

    useEffect(() => {
      const timeout = setTimeout(() => {
        setUserInfo({
          loanType: 'Personal',
          firstName: JSON.parse(window.localStorage.getItem("User"))[0]?.firstName,
          lastName: JSON.parse(window.localStorage.getItem("User"))[0]?.lastName,
          cardNo: JSON.parse(window.localStorage.getItem("Debit")).filter((debit) => debit?.accountNo == activeAccount)[0]?.cardNo,
        });
      },3000);

      return () => clearTimeout(timeout);
    }, [interestRate]);

  useEffect(()=>{
    if(loginStatus){
    if (totalLoanAmt >= 200000) {
      setInterestRate(5);
         }

     else if (totalLoanAmt>=50000 && totalLoanAmt < 200000 ) {
         setInterestRate(8);
         }

        const p = parseFloat(totalLoanAmt);
        const r = parseFloat(interestRate) / 100/ 12 ;
        const n = parseFloat(tenure)*12 ;

       const installment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

       setInstallment(installment.toFixed(2));
       setBalanceAmt(totalLoanAmt);}
       else
          navigate("/login")

    },[totalLoanAmt,interestRate,tenure])


  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if(formValidation()){
    console.log("loanData:",user);
    const timeout = setTimeout(() => {
    setUserInfo((prevState) => ({
      ...prevState,
      totalLoanAmt: totalLoanAmt,
      tenure: tenure,
      interestRate: interestRate,
      installment: installment,
      balanceAmt: balanceAmt
    }));

      addLoan(user).then(res=> {
        updateLoanCookies(user?.cardNo);
                window.alert("Loan applied.")
                navigate("/");
                console.log("loan added");
             })

             .catch((error) => {
              console.error('Error:', error);
              window.alert(error.response.data.message);
            });
          },3000);

          return () => clearTimeout(timeout);
          }

  };

  const formValidation = () =>{
    // const loanTypeErr = {};
    // const firstNameErr = {};
    // const lastNameErr = {};
    // const cardNoErr = {};
    const totalLoanAmtErr = {};
    const tenureErr = {};
    // const interestRateErr = {};
    // const installmentErr = {};
    // const balanceAmtErr = {};
    let isValid = true;

  //   if(user?.firstName.trim().length===0){
  //    firstNameErr.firstNameEmpty = "First Name is required";
  //    isValid = false;
  //  }
  //  if(user?.lastName.trim().length===0){
  //    lastNameErr.lastNameEmpty = "Last Name is required";
  //    isValid = false;
  //  }
  //  if(user?.cardNo.trim().length===0){
  //   cardNoErr.cardNoEmpty = "Card Number is required";
  //   isValid = false;
  // }
  // else if((user?.cardNo.toString().length!==16)){
  //     cardNoErr.cardNolength = "Card Number should be 16 digits";
  //     isValid = false;
  //   }

  if(totalLoanAmt.trim().length===0){
    totalLoanAmtErr.totalLoanAmtEmpty = "Total Loan Amount is required";
    isValid = false;
  }
  else if ((totalLoanAmt<50000)||(totalLoanAmt > 2000000)){
    totalLoanAmtErr.totalLoanValue = "Loan Amount should be between 50000 and 2000000";
    isValid =  false;
  }
  if(tenure.trim().length===0){
    tenureErr.tenureEmpty = "Tenure is required";
    isValid = false;
  }
  else if((tenure<1)||(tenure>10)){
    tenureErr.tenureValue = "Tenure should be between 1 and 10";
    isValid = false;
  }
      // setFirstNameErr(firstNameErr);
      // setLastNameErr(lastNameErr);
      // setCardNoErr(cardNoErr);
      setTotalLoanAmtErr(totalLoanAmtErr);
      setTenureErr(tenureErr);
      return isValid;

  }

  return (
    <div className='container'>
    <div style={{'margin-top': '100px', marginBottom: '30px'}}>
     <center>
      <h2 style={{'marginTop':'6rem'}}>Welcome to EasyWay Bank</h2>
      <h4>24X7 PERSONAL LOANS</h4>
     </center>
     <br/>
         <div style={{'display':'flex'}} >
         <div style={{'flex':'1'}}>

        <br></br>

                    <h6 style={{'marginInlineStart':'145px',fontSize:'23px'}}>LET US BEGIN</h6>
                    <Link to='/LoanCalculator'>
                    <button type="button" className="btn btn-dark" style={{'marginInlineStart':'115px'}}>Calculate your EMI here.</button>
                    </Link>

                     <div className='card col-md-8 offset-md-3 offset-md-2' style={{'margin-top': '30px','marginLeft':'40px'}}>
                   <div className='card-body'>
                    <center><h3>Application Form</h3></center>
                 <form>
                     <br></br>
                     <div className="mb-3">
                     <label>First Name</label>
                     <input
                         type="text"
                         className="form-control"
                        //  name={loanData.firstName}
                        placeholder="Enter First Name"
                        value={user?.firstName}
                        readOnly
                     />
                     </div>
                     {Object.keys(firstNameErr).map((key)=>{
                      return <div style={{color : "red"}}>{firstNameErr[key]}</div>
                    })}

                     <div className="mb-3">
                     <label>Last Name</label>
                     <input
                         type="text"
                         className="form-control"
                         placeholder="Enter Last Name"
                         value={user?.lastName}
                         readOnly
                     />
                     </div>
                     {Object.keys(lastNameErr).map((key)=>{
                      return <div style={{color : "red"}}>{lastNameErr[key]}</div>
                    })}
                     <div className="mb-3">
                     <label>Debit Card Number</label>
                     <input
                         type="number"
                         className="form-control"
                         placeholder="Enter Debit Card Number"
                         value={user?.cardNo}
                         readOnly
                     />
                     </div>
                     {Object.keys(cardNoErr).map((key)=>{
                      return <div style={{color : "red"}}>{cardNoErr[key]}</div>
                    })}
                     <div className="mb-3">
                     <label>Loan Amount</label>
                     <input
                         type="number"
                         className="form-control"
                         placeholder="Enter loan amount"
                         min={50000}
                         max={2000000}
                         value={totalLoanAmt}
                         onChange={(e) => setTotalLoanAmt(e.target.value)}

                         />
                     </div>
                     {Object.keys(totalLoanAmtErr).map((key)=>{
                      return <div style={{color : "red"}}>{totalLoanAmtErr[key]}</div>
                    })}
                     <div className="mb-3">
                     <label>Tenure(Years)</label>
                     <input
                         type="number"
                         className="form-control"
                         placeholder="Enter tenure"
                         min={1}
                         max={10}
                         value={tenure}
                         onChange={(e) => setTenure(e.target.value)}
                     />
                     </div>
                     {Object.keys(tenureErr).map((key)=>{
                      return <div style={{color : "red"}}>{tenureErr[key]}</div>
                    })}

                     <div className="mb-3">
                     <label>Interest Rate: {interestRate}%</label>
                     </div>
                     <div className="mb-3">
                     <label>Monthly Payment: {installment}</label>
                     </div>
                    <center> <Button onClick={handleSubmit}>Submit</Button> </center>
                     </form>
                     </div>
                     </div>
                  {/* )} */}
                     </div>


                 <div style={{'marginBlockStart': '100px','flex':'1','margin-inline-start': '130px'}}>
                   <BsGraphUpArrow style={{'font-size':'40px'}}/>
                   <HiCurrencyRupee style={{position:"absolute",top:"300px"}}/>
                   <br></br>
                   <h5 style={{'position':'absolute',right:"440px",top: '310px'}}>AVAIL FUNDS EASILY</h5>
                   <p style={{'position':'absolute',right:"509px",top: '330px'}}>Get funds easily</p>
                   <br></br>
                   <br></br>
                   <FaThumbsUp style={{'font-size':'40px'}}/>
                   <h5 style={{'position':'absolute',right:"477px",top: '400px'}}>NO PAPERWORK</h5>
                   <p style={{'position':'absolute',right:"340px",top: '420px'}}>Step away from tedious documentation</p>
                   <br></br>
                   <br></br>
                   <br></br>
                   <BsClockHistory style={{'font-size':'40px'}}/>
                   <h5 style={{'position':'absolute',right:"420px",top: '480px'}}>SEAMLESS EXPERIENCE</h5>
                   <p style={{'position':'absolute',right:"415px",top: '500px'}}>Apply digitally in a few clicks</p>
                   <hr style={{margin: '3rem 0',
                    color: 'black',
                    border: 'black',
                    'border-top': '2px solid',
                    opacity: '.75'}}></hr>
                    <p style={{'position':'absolute','fontSize':'20px','right':'350px',top: '580px'}}>Loan amount: Min: 50k Max: 25lakh</p>

                    <hr style={{'border-top': '2.35px dotted black'}}></hr>
                    <p style={{'position':'absolute','fontSize':'20px','right':'350px'}}>Pay EMI as low as Rs.2149 per Lakh*</p>
                    <br></br>

                    <p style={{'position':'absolute','fontSize':'13px','right':'300px'}}>Loan tenure upto 60 months
                    Interest rate starting from 10.49%</p>


                </div>

       </div>
       </div>
    </div>

  )
}

export default ApplyLoan;
