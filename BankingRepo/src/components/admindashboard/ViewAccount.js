import React,{useState,useEffect} from 'react'
import { Button } from 'react-bootstrap';
import { Link,useNavigate,useParams } from 'react-router-dom';
import useAccountService from '../../services/AccountService';
import Cookies from 'js-cookie';

function ViewAccount() {

  const [customerId,setCustomerId] = useState('')
  const [accountNo,setAccountNo] = useState('');
  const [accountType,setAccountType] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [emailId,setEmailId] = useState('');
  const [mobileNumber,setMobileNumber]= useState('');
  const [address,setAddress]= useState('');
  const [state,setState] = useState('');
  const [country,setCountry] = useState('');
  const [panNumber,setPanNumber] = useState('');
  const [balance,setBalance] = useState('');
  const [status,setStatus] = useState('');

  const navigate = useNavigate();
    const adminLoginStatus = Cookies.get("AdminLoginStatus")

  const {getAccountById} = useAccountService();
  const {id} = useParams();

    const getAccByIds = ()=>{

        getAccountById(id)
        .then((res)=>{
            console.log(res)
         setCustomerId(res.data[0].customerId)
         setAccountNo(res.data[0].accountNo)
         setAccountType(res.data[0].accountType)
         setFirstName(res.data[0].firstName)
         setLastName(res.data[0].lastName)
         setEmailId(res.data[0].emailId)
         setMobileNumber(res.data[0].mobileNumber)
         setAddress(res.data[0].address)
         setState(res.data[0].state)
         setCountry(res.data[0].country)
         setPanNumber(res.data[0].panNumber)
         setBalance(res.data[0].balance)
         setStatus(res.data[0].status)
        })
    }
  useEffect(()=>{
    if(adminLoginStatus)
        getAccByIds()
    else
        navigate('/login');
    },[adminLoginStatus])

  return (
    <div className='container'>
    <div className='card col-md-6 offset-md-3' style={{position: 'inherit','margin-top': '100px', marginBottom: '140px',display: "flex",flexDirection: 'row'}}>

    <h1 className='text-center' style={{marginTop:'100px',marginLeft:"40px"}}>Employee Details</h1>

    <div  style={{alignContent:"center",marginLeft:"40px",marginTop:"20px",marginBottom:"20px"}}>
        <div className="row">
            <h5> customerId:</h5>
            <div>{customerId}</div>
        </div>
        &nbsp;

        <br></br>
        <div className="row">
            <h5>accountNo:</h5>
            <div>{accountNo}</div>
        </div>
        &nbsp;
        <br></br>
        <div className="row">
            <h5>accountType:</h5>
            <div>{accountType}</div>
        </div>
        &nbsp;
        <div className="row">
            <h5>firstName:</h5>
            <div>{firstName}</div>
        </div>
        &nbsp;
        <div className="row">
            <h5>lastName:</h5>
            <div>{lastName}</div>
        </div>
        &nbsp;
        <div className="row">
            <h5>emailId:</h5>
            <div>{emailId}</div>
        </div>
        &nbsp;
        <div className="row">
            <h5>mobileNumber:</h5>
            <div>{mobileNumber}</div>
        </div>
        </div>

        <div style={{alignContent:"center",marginLeft:"32px",marginTop:"20px",marginBottom:"20px",marginRight:"20px"}}>
        <div className="row">
            <h5>address:</h5>
            <div>{address}</div>
        </div>
        &nbsp;
        <div className="row">
            <h5>state:</h5>
            <div>{state}</div>
        </div>
        <br></br>
        <div className="row">
            <h5>country:</h5>
            <div>{country}</div>
        </div>
        <br></br>
        <div className="row">
            <h5>panNumber:</h5>
            <div>{panNumber}</div>
        </div>
        <br></br>
        <div className="row">
            <h5>balance:</h5>
            <div>{balance}</div>
        </div>
        <br></br>
        <div className="row">
            <h5>status:</h5>
            <div>{status}</div>
        </div>
        &nbsp;
        <div className="row" style={{alignItems:'auto'}}>
        <Link to='/existingAccounts'>
        <Button

            style={{float: 'left',
                width: '50%'}}
            className='btn btn-info center'>
            Back
        </Button>
        </Link>
        </div>
    </div>
    </div>
    </div>
  )
}

export default ViewAccount