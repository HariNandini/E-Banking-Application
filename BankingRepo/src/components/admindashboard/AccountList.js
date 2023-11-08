import React,{useState,useEffect} from 'react'
import { Button,Table } from 'react-bootstrap';
import { Link,useNavigate,useParams} from 'react-router-dom';
import useAccountService from '../../services/AccountService';
import Cookies from 'js-cookie';
import {FiEdit2} from 'react-icons/fi';
import {AiFillDelete,AiFillEye} from 'react-icons/ai';
import {GrView} from 'react-icons/gr';
import { IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import {MdOutlinePreview} from 'react-icons/md';
const AccountList=()=>{
    const[accounts,setAccounts]=useState([]);
    const {getAccounts,deleteAccount} = useAccountService();
    const [adminLoginStatus, setAdminLoginStatus] = useState(false);
    const navigate= useNavigate();

    const deleteAccountById = (customerId) =>{
    deleteAccount(customerId)
    .then((res)=>{
      console.log("deleted sucesfully")
      navigate('/existingAccounts')
    })
    .catch((err)=>{
      console.log(err)
    })
   }

   useEffect(()=>{
    const timeout = setTimeout(()=>{
      setAdminLoginStatus(Cookies.get("AdminLoginStatus"))

    },1000)
    return ()=>clearTimeout(timeout)
},[deleteAccountById])

   useEffect(()=>{
    const getAllAccounts=()=>{
      getAccounts()
      .then((res)=>{
          setAccounts(res.data)
      })
      .catch((err)=>{
          console.log(err)
      })
    };
    const timeout = setTimeout(()=>{
      // console.log(adminLoginStatus)
    if(adminLoginStatus)
      getAllAccounts();
    else
      navigate('/login');

    },3000)
    return ()=>clearTimeout(timeout)

  },[adminLoginStatus])

    return (
      <div>
            <div className='container'>
               <div style={{'marginTop': '100px', marginBottom: '200px'}}>

               <h2 className='text-center'>Accounts List</h2>

                 {/*<div className='card-body'>*/}
                 <div className='table' style={{'marginTop':'30px',width:'fit-content','background': 'gainsboro','alignItems':'center','background-color': 'white',
                 'box-shadow': '-2px 2px 13px -2px'}}>
                 <Table striped bordered>
                   <thead>
                   <tr>
                   <th>Customer Id</th>
                   <th>Account Number</th>
                   <th>Account Type</th>
                   <th>First Name</th>
                   <th>Last Name</th>
                   <th>Email Id</th>
                   <th>Mobile Number</th>
                   <th>Address</th>

                   <th>Pan Number</th>
                   <th>Balance</th>
                   <th>Status</th>
                   <th>Actions</th>
                   </tr>
                   </thead>
                   <tbody>
                   {
                     accounts.map (
                       account =>
                       <tr key={account.id}>
                       <td>{account.customerId}</td>
                       <td>{account.accountNo}</td>
                       <td>{account.accountType}</td>
                       <td>{account.firstName}</td>
                       <td>{account.lastName}</td>
                       <td>{account.emailId}</td>
                       <td>{account.mobileNumber}</td>
                       <td>{account.address}</td>

                       <td>{account.panNumber}</td>
                       <td>{account.balance}</td>
                       <td>{account.status}</td>
                       <td>
                       <div className='d-flex flex-row justify-content-evenly align-items-center gap-2'>
                       <Link to={`/updateAccount/${account.id}`}>
                       {/*<Button style={{backgroundColor:'white',color:'black'}}>Update</Button>*/}
                       <IconButton style={{'background-color':'black',borderRadius: '50%','padding': '10px',marginTop:'5px'}}>
                       <FiEdit2 style={{color:'white'}}/>
                       </IconButton>
                       </Link>



                      {/*<Button onClick={()=> deleteAccountById(account.id)} style={{marginTop:"5px",backgroundColor:'gray',color:'black'}}>Delete</Button>
                       <button class="button" onClick={()=> deleteAccountById(account.id)}>
                        <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                       </button>*/}
                       <IconButton onClick={()=> deleteAccountById(account.id)} style={{'background-color':'black','border-radius': '50%','padding': '10px',marginTop:'5px'}}>
                       <AiFillDelete style={{color:'white'}}/>
                       </IconButton>



                       <Link to={`/viewAccount/${account.id}`}>

                       <IconButton style={{'background-color':'black','border-radius': '50%','padding': '10px',marginTop:'5px'}}>
                       <AiFillEye style={{color:'white'}}/>
                       </IconButton>
                      {/*<Button style={{marginTop:"5px",backgroundColor:'white',color:'black'}}>View</Button>*/}
                       </Link>
                       </div>
                       </td>
                       </tr>
                     )
                   }
                   </tbody>
                </Table>
                </div>
                </div>
             </div>
         </div>
    )

}

export default AccountList;
