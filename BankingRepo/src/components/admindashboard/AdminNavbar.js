import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from '@mui/material/Button'
import { useNavigate, Link} from 'react-router-dom'
import {FaInfoCircle, FaUserPlus} from 'react-icons/fa';
import {BiSupport} from 'react-icons/bi'
import {FiLogOut} from 'react-icons/fi';
import Cookies from 'js-cookie';

const AdminNavbar=()=>{

  const navigate= useNavigate();
  const adminLoginStatus = Cookies.get("AdminLoginStatus");

  const handleLogout=()=>{
    Cookies.remove("AdminLoginStatus");
    navigate('/login');
    window.location.reload();
  }

    return (
      <Navbar bg="dark" variant="dark"  fixed='top'>
        <Container>
          <Navbar.Brand href="/admindashboard">Easy Way Banking</Navbar.Brand>
          <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>

          <div>
          <FaInfoCircle className='NavBarIcons'/>
          <Link to='/DebitapprovalsHistory'>
              <Button> <Navbar.Text> Debit Approvals </Navbar.Text>  </Button>
          </Link></div>

          <div>
          <FaInfoCircle className='NavBarIcons'/>
          <Link to='/CreditapprovalsHistory'>
              <Button> <Navbar.Text> Credit Approvals </Navbar.Text>  </Button>
          </Link>
          </div>

          <div>
          <BiSupport className='NavBarIcons'/>
          <Link to='/LoanapprovalsHistory'>
              <Button> <Navbar.Text> Loan Approvals </Navbar.Text> </Button>
          </Link>
          </div>

            <div>
          <FaUserPlus className='NavBarIcons'/>
          <Link to='/addAccount'>
              <Button> <Navbar.Text> Add Accounts</Navbar.Text> </Button>
          </Link>
          </div>
          <div>
          <BiSupport className='NavBarIcons'/>
          <Link to='/existingAccounts'>
              <Button> <Navbar.Text> Existing Accounts </Navbar.Text> </Button>
          </Link>
          </div>
          {adminLoginStatus &&
            <div>
                  <FiLogOut className='NavBarIcons'/>
                  <Button onClick={handleLogout}> <Navbar.Text> Logout</Navbar.Text>  </Button>
              </div>

          }
          {!adminLoginStatus &&
            <div>
                  <FiLogOut className='NavBarIcons'/>
                  <Button onClick={()=>navigate('/login')}> <Navbar.Text> Login</Navbar.Text>  </Button>
              </div>

          }
          </div>
        </Container>
    </Navbar>
    )

}

export default AdminNavbar;
