import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import useAccountService from '../services/AccountService';
import Cookies from 'js-cookie';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const { getAccountDetails, getDebitDetails,getCreditDetails, getLoanDetails } = useAccountService();
  const [userInfo, setUserInfo] = useState({
    emailId: '',
    password: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the login API request
    axios
      .post('http://localhost:8080/api/user/login', userInfo)
      .then((response) => {
        const token = response.data.token;
        // Set the token in cookies
        Cookies.set('loginStatus', true);
        Cookies.set('token', token);
        // Fetch user details
        getAccountDetails(userInfo.emailId)
          .then((response) => {
            const accountsList = response.data;
            // Fetch debit details
            let debitDetails = [];
            let loanDetails = [];
            let creditDetails = [];
            accountsList.map((accountsListVar, idx)=>{
              getDebitDetails(accountsListVar.accountNo).then((res) => {
                    console.log("debit details response data: "+ res.data);
                    if(res.data)
                    {
                      debitDetails[idx] = res.data;
                      console.log("debit details   "+debitDetails[idx].cardNo);
                      getLoanDetails(debitDetails[idx].cardNo).then((loanRes) => {
                        loanDetails[idx] = loanRes.data;
                        console.log("loan details   "+loanDetails[idx].loanId);
                      })//loan details
                      .catch((error) => {
                        console.log(error.response.data.message);
                      });
                    }//if condition

                })//debit details
                .catch((error) => {
                  console.log(error.response.data.message);
                });

                getCreditDetails(accountsListVar.accountNo).then((res) => {
                  console.log("Credit details response data: "+ res.data);
                  if(res.data)
                  {
                    creditDetails[idx] = res.data;
                    console.log("Credit details   "+creditDetails[idx].cardNo);

                  }//if condition

              })//credit details
              .catch((error) => {
                console.log(error.response.data.message);
              });
            })//map loop


            // Store user details in cookies
            const timeout = setTimeout(()=>{
            window.localStorage.setItem("User", JSON.stringify(accountsList));
              window.localStorage.setItem("Debit", JSON.stringify(debitDetails));
              window.localStorage.setItem("Loan",JSON.stringify(loanDetails));
              window.localStorage.setItem("Credit",JSON.stringify(creditDetails));
              Cookies.set('ActiveAccount', accountsList[0].accountNo);

              console.log(window.localStorage.getItem('User'));
              // Redirect to the home page
              navigate('/');
              window.location.reload();
            },3000)

            return ()=>clearTimeout(timeout)
          }) //account details
          .catch((error) => {
            console.log(error.response.data.message);
          });

        //axios errors for login request
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        if (error.response) {
          // Request was made and server responded with a status code
          // window.alert(errorMessage);
          console.log(errorMessage);
          setShowAlert(true);
        } else if (error.request) {
          // The request was made but no response was received
          // window.alert(errorMessage);
          console.log(error.request);
        } else {
          // Other errors
          // window.alert(errorMessage);
          console.log(error.message);
        }
      });
  };

  const handlepassword = (e) => {
    e.preventDefault();
    // Perform the login API request
    axios.post('http://localhost:8080/api/user/forgotpassword', userInfo)
            .then((response) => {
              // Handle success
              window.alert("mail send");
              window.location.href = '/user/verify';
            })
            .catch((error) => {
              // Handle error
              window.alert(error.response.data.message);
            });
          }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3" style={{ marginTop: '130px', marginBottom: '200px' }}>
          <div className="card-body">
            <center>
              <h3>Log In</h3>
            </center>
            <br />
            {showAlert && (
              <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                Invalid login credentials.
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <h5>
                  <label>Email Id :</label>
                </h5>
                <input
                  type="text"
                  className="form-control"
                  name="emailId"
                  value={userInfo.emailId}
                  onChange={handleChange}
                  placeholder="emailId"
                  maxLength={30}
                  minLength={5}
                  required
                />
              </div>
              <div className="mb-3">
                <h5>
                  <label>Password :</label>
                </h5>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    name="password"
                    value={userInfo.password}
                    onChange={handleChange}
                    placeholder="password"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={togglePasswordVisibility}
                    style={{ marginLeft: '5px' }}
                  >
                    {showPassword ? (
                      <span role="img" aria-label="Hide Password">
                        👀
                      </span>
                    ) : (
                      <span role="img" aria-label="Show Password">
                        👁️
                      </span>
                    )}
                  </button>
                </div>
              </div>
              <center>
                <Button type="submit" className="btn btn-primary">
                  Submit
                </Button>
              </center>
              <br />
              <div style={{ display: 'flex', flexDirection: 'row', columnGap: '200px' }}>
              <div>
                  <p className="forgot-password text-right">
                    <a href="/" onClick={handlepassword}>Forgot password?</a>
                  </p>
                </div>
                <div>
                  <p className="forgot-password text-right">
                    Do not have an account? <Link to="/register">SignUp here</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;