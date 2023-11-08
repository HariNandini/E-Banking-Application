import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import { FaCreditCard, FaInfoCircle, FaUserPlus, FaSignInAlt, FaUser ,FaBell} from 'react-icons/fa';
import {FiBell, FiLogOut} from 'react-icons/fi';
import { IoMdSettings } from "react-icons/io";
import {BiMoney, BiSupport} from 'react-icons/bi'
import {MdAccountBalance} from 'react-icons/md';
import {GiReceiveMoney} from 'react-icons/gi';
import Cookies from 'js-cookie';
import axios from 'axios';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';





const NavbarComponent=()=>{
  const [login,setLogin] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState();

  const logout=()=>{

    Cookies.remove("loginStatus");
    Cookies.remove("User");
    Cookies.remove("ActiveAccount");
    Cookies.remove("token");
    window.localStorage.clear();
    setLogin(false)
    navigate("/login")
    window.location.reload()
  }

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setLogin(Cookies.get("loginStatus"))

    },1000)

    return ()=>clearTimeout(timeout)

},[])
useEffect(()=>{
  if(login)
    setUser(JSON.parse(window.localStorage.getItem("User")))

},[login])

  const handleSwitchAccounts=(accountNo)=>{
    console.log(accountNo);
    Cookies.set("ActiveAccount", accountNo);
    window.location.reload()
  }

  const [notifications, setNotifications] = useState([]);
  const token = Cookies.get('token');
  
  const notify=()=>{
    console.log(user[0]?.emailId);
    axios.get('http://localhost:8080/api/user/notifications/'+user[0]?.emailId,
    {
      headers: {
        Authorization: 'Bearer ' + token //the token is a variable which holds the token
      }
    }
    
    )
      .then((response) => {
        // Handle success

        console.log(response.data);
        setNotifications(response.data);

        notifications.map((not, index)=>{
          // console.log(not.notificationType);
          // toast("The "+not.notificationType+" Of card no "+not.cardNo+" is in "+not.status);

          toast("Please set pin for card no "+not.cardNo+" of then type "+not.notificationType);

        })
        //console.log(notifications);
        //window.location.href = '/';
      })
      .catch((error) => {
        // Handle error
        window.alert(error.response.data.message);
      });


  }

    return (
      <div>
      <Navbar variant="dark"  fixed='top' style={{backgroundColor: '#3d3d3d'}}>

        <Container>
          <Navbar.Brand href="/user" ><b>EASY WAY BANKING</b></Navbar.Brand>
              
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              <MdAccountBalance  className="NavBarIcons"/>
              <NavDropdown className='NavDropdown'
                  id="nav-dropdown-dark-example"
                  title="Services"
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="/user/transaction">Transactions</NavDropdown.Item>
                  <NavDropdown.Item href="/user/transactionHistory">Transaction History</NavDropdown.Item>
                </NavDropdown>
            </Nav>
              
            <Nav>
            <FaCreditCard className='NavBarIcons'/>
              <NavDropdown className='NavDropdown'
                  id="nav-dropdown-dark-example"
                  title="Cards"
                  menuVariant="dark"
                >
                      <NavDropdown className='NavDropdown'
                      id="nav-dropdown-dark-example"
                      title="Debit Card"
                      menuVariant="dark"
                      >
                          <NavDropdown.Item href="/user/applydebitcard">Apply debit card</NavDropdown.Item>
                          <NavDropdown.Item href="/user/setorresetpin">Reset pin</NavDropdown.Item>
                          <NavDropdown.Item href="/user/blockcard">Block debit card</NavDropdown.Item>
                          <NavDropdown.Item href="/user/unblockcard">Unblock debit card</NavDropdown.Item>

                      </NavDropdown>
                      <NavDropdown className='NavDropdown'
                        id="nav-dropdown-dark-example"
                        title="Credit Card"
                        menuVariant="dark"
                      >
                          <NavDropdown.Item href="/user/applycreditcard">Apply credit card</NavDropdown.Item>
                          <NavDropdown.Item href="/user/creditSetorResetpin">Reset pin</NavDropdown.Item>
                          <NavDropdown.Item href="/user/blockCreditcard">Block credit card</NavDropdown.Item>
                          <NavDropdown.Item href="/user/unBlockCreditcard">Unblock credit card</NavDropdown.Item>
                      </NavDropdown>
                  </NavDropdown>
            </Nav>
              


            <Nav>
            <GiReceiveMoney className='NavBarIcons'/>
              <NavDropdown className='NavDropdown'
                  id="nav-dropdown-dark-example"
                  title="Loans"
                  menuVariant="dark"
                >
                      <NavDropdown className='NavDropdown'
                      id="nav-dropdown-dark-example"
                      title="Personal Loan"
                      menuVariant="dark"
                      >
                          <NavDropdown.Item href="/user/applyLoan">Apply loan</NavDropdown.Item>
                          <NavDropdown.Item href="/user/loanEligibility">Check Eligibility</NavDropdown.Item>
                          <NavDropdown.Item href="/user/loanCalculator">Personal Loan EMI Calculator</NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown.Item href="#">Car loan</NavDropdown.Item>
                      <NavDropdown.Item href="#">Home loan</NavDropdown.Item>
                      <NavDropdown.Item href="#">Business loan</NavDropdown.Item>
                      </NavDropdown>
                      </Nav>
                        

            {login &&
              <>
                <Nav>
                  <IoMdSettings className="NavBarIcons"/>
                  <NavDropdown className='NavDropdown'
                    id="nav-dropdown-dark-example"
                    title="My Accounts"
                    menuVariant="dark"
                  >
                    {user &&

                      user?.map((x,idx)=>
                          <NavDropdown.Item style={Cookies.get("ActiveAccount")==x.accountNo? {backgroundColor: 'lightgrey'}: {backgroundColor: 'none'}}
                                  onClick={()=>handleSwitchAccounts(x.accountNo)}>{x.accountNo}</NavDropdown.Item>)
                    }
                  </NavDropdown>
                </Nav>
              </>
              }

          </Navbar.Collapse>
          <FaInfoCircle className='NavBarIcons'/>
          <Link to='/aboutus'>
              <Button> <Navbar.Text> About us </Navbar.Text>  </Button>
          </Link>
            
          <BiSupport className='NavBarIcons'/>
          <Link to='/support'>
              <Button> <Navbar.Text> Support </Navbar.Text> </Button>
          </Link>
            
          { !login &&
            <>
            <FaUserPlus className='NavBarIcons'/>
            <Link to='/register'>
                <Button> <Navbar.Text> Register </Navbar.Text> </Button>
            </Link>
            </>
          }
            
          { !login &&
          <>
          <FaSignInAlt className='NavBarIcons'/>
          <Link to='/login'>
                <Button> <Navbar.Text> Login </Navbar.Text>  </Button>
          </Link>
          </>
          }
          {   login &&
          <>
          <FaUser className='NavBarIcons'/>
          <Link to='/profile'>
                <Button> <Navbar.Text> Profile </Navbar.Text>  </Button>
          </Link>
          </>
          }
          &nbsp;&nbsp;

          {   login &&
          <>
          <FiLogOut className='NavBarIcons'/>

                <Button onClick={logout}> <Navbar.Text> Logout</Navbar.Text>  </Button>

          </>

          }
            
          {login &&
          <>
          <FiBell className='NavBarIcons'/>
          <Button onClick={notify}> <Navbar.Text> notifications</Navbar.Text>  </Button>

          </>
          }
          </Navbar.Collapse>
        </Container>
    </Navbar>
    </div>
    )

}

export default NavbarComponent;
