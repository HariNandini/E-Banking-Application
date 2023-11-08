import React,{ useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Button } from 'react-bootstrap';
function LoanCalculator() {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');

  const calculateLoan = () => {
   const p = parseFloat(principal);
   const r = parseFloat(interestRate) / 100 / 12;
   const n = parseFloat(loanTerm) * 12;

  const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  setMonthlyPayment(monthlyPayment.toFixed(2));
  };

  const handleLoanAmountChange = (value) => {
     setPrincipal(value);
     };

     const handleInterestRateChange = (value) => {
      setInterestRate(value);
    };

    const handleLoanTermChange = (value) => {
      setLoanTerm(value);
    };

    useEffect(() => {
      calculateLoan();
    }, [principal, interestRate, loanTerm]);

  return (
    <div style={{'height':'600px'}}>
        {/* <div style={{'textAlign':'center','border': 'solid 2px black','margin-top': '8rem','display':'flex'}}>*/}
        <div style={{marginTop: "100px", marginLeft: "300px",  width: "50%"}}>
        <center><Link to = "/applyLoan"> <button type="button" className="btn btn-dark">Apply Loan Here</button></Link></center>
       </div>
           <div className='card col-md-6 offset-md-3 offset-md-3'
                      style={{'margin-top': '20px','border-width':'2px','border-color':'black',
                      'margin-left': '310px'}}>
          <center><h1 style={{'marginTop':'1rem'}}>Loan Calculator</h1></center>
            <div>
             <label style={{'margin-left':'100px','font-size': '20px'}}>
             <span style={{ display: 'inline-block', marginRight: '77px',marginLeft:'92px'}}>Loan Amount:</span>
             <div
             style={{
               width: '80px',
               height: '50px',
               backgroundColor: 'darkgray',
               marginTop: '10px',
               display: 'inline-block'
             }}
           >{principal}</div></label>
            {/*<input type="range"  min="0" max="10"  value={principal} onChange={(e) => setPrincipal(e.target.value)} />
  <p>Value: <output id="value"></output></p>*/}

         <Slider style={{width: '42%',left: '200px','top': '20px'}}
             min={50000}
             max={200000}
             step={1000}
             value={principal}
             onChange={handleLoanAmountChange}
          />
             </div>
             <br></br>
            <div>
             <label style={{'margin-left':'196px','font-size': '20px'}}>
             <span style={{ display: 'inline-block', marginRight: '50px' }}>Interest Rate (%):</span>
             <div
             style={{
               width: '80px',
               height: '50px',
               backgroundColor: 'darkgray',
               marginTop: '10px',
               display: 'inline-block'
             }}
           >{interestRate}</div></label>
             {/*<input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />*/}
             <Slider style={{width: '42%',left: '200px','top': '20px'}}
             min={12}
             max={22}
             step={0.5}
             value={interestRate}
             onChange={handleInterestRateChange}
           />

            </div>
            <br></br>
            <div>
             <label style={{'margin-left':'200px','font-size': '20px'}}>
             <span style={{ display: 'inline-block', marginRight: '19px' }}>Loan Term (years):</span>
             <div
             style={{
               width: '80px',
               height: '50px',
               backgroundColor: 'darkgray',
               marginTop: '10px',
               display: 'inline-block'
             }}
           >{loanTerm}</div></label>
             {/*<input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} />*/}
             <Slider style={{width: '42%',left: '200px','top': '20px'}}
              min={1}
              max={10}
              step={1}
              value={loanTerm}
              onChange={handleLoanTermChange}
              />
            </div>

            {/*<button style={{'margin-bottom': '1rem'}} onClick={calculateLoan}>Calculate</button>
            {monthlyPayment && (
             <div>
              <h2>Monthly Payment:</h2>
              <p>{monthlyPayment}</p>
              <Link to='/applyLoan'>
              <button>Get Instant Funds</button>
              </Link>
             </div>
            )}*/}
            <br></br>
            <br></br>
            <div>
        <center> <h5 style={{fontSize:'25px'}}>Monthly Payment: {monthlyPayment}</h5> </center>
      </div>

            </div>
            </div>


          )
}

export default LoanCalculator;