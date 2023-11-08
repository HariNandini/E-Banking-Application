import React,{ useState ,useEffect} from 'react'
import {Button} from 'react-bootstrap';
import { useNavigate,useParams,Link} from 'react-router-dom';
import useAccountService from '../../services/AccountService';
import Cookies from 'js-cookie';


function AddAccount() {

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

//   const custId = React.useMemo(()=> uuidv4(),[]);
  const navigate=useNavigate();
  const {id}=useParams();
  const {addAccount,updateAccount,getAccountById} = useAccountService();
  const [adminLoginStatus, setAdminLoginStatus] = useState(false);

  useEffect(()=>{
   const timeout = setTimeout(()=>{
     setAdminLoginStatus(Cookies.get("AdminLoginStatus"))

   },1000)
   return ()=>clearTimeout(timeout)
},[])

  useEffect(()=>{
   const getAccountByIds = (id)=>{
         getAccountById(id)
      .then((res)=>{
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
      .catch((err)=>{
         console.log(err)
      })
   }
   const timeout = setTimeout(()=>{
      console.log(adminLoginStatus)
    if(adminLoginStatus)
         getAccountByIds(id)
         else
      navigate('/login');

    },3000)
    return ()=>clearTimeout(timeout)
},[id, adminLoginStatus])

  const generateRandomAccountNumber = () => {
     const length = 10;
     const characters = '0123456789';

     let result = '';
     for (let i = 0; i < (length); i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;

     };

     const generateRandomCustomerId = () => {
      const length = 5;
      const characters = '0123456789';

      let result = '';
      for (let i = 0; i < length; i++) {
       const randomIndex = Math.floor(Math.random() * characters.length);
       result += characters.charAt(randomIndex);
     }

     return result;

      };

  const handleSubmit = (e) => {
    e.preventDefault();

    const account = {
      customerId:generateRandomCustomerId(),
      accountNo: generateRandomAccountNumber(),
      accountType,
      firstName,
      lastName,
      emailId,
      mobileNumber,
      address,
      state,
      country,
      panNumber,
      balance,
      status
    };
    console.log("account:",account);
       if(id)
    {
      updateAccount(id,account).then((res)=>{
         navigate("/existingAccounts");
      })
      .catch((err)=>{
         console.log(err)
       })
    }
    else{
      addAccount(account).then((res)=> {
                console.log("acc added");
                window.alert("Account successfully added");
                navigate("/existingAccounts");
             })
             .catch((error) => {
              console.error('Error:', error);
              window.alert(error.response.data.message)
            });

         }
  };

  const title = () =>{
   if(id){
     return <h3 className='text-center'>Update Account</h3>
   }
   else{
     return <h3 className='text-center'>Add Account</h3>
   }
 }

  return (
    <div>
            <div className='row' >
               <div className='card col-md-6 offset-md-3 offset-md-3' style={{marginTop: '100px', marginBottom: '140px'}}>
                 <div className='card-body'>
                         {
                           title()
                         }
                      <form onSubmit={handleSubmit}>
                        <div style={{marginTop: '20px',display: "flex", flexDirection: 'row', gap: '40px'}}>
                           <div style={{width: '50%'}}>
                             {/*<div className="mb-3">
                                <h5><label>Customer Id:</label></h5>
                                <input type="text" className="form-control" name="customerId" value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder="customerId" maxLength={5} minLength={5} required/>
                             </div>

                             <div className="mb-3">
                                <h5><label>Account Number :</label></h5>
                                <input type="text" className="form-control" name="accountNo" value={generateRandomAccountNumber}/>
                             </div>
                             <div className="mb-3">
                                 <label>Account Number: {accountNumber}</label>
                             </div>*/}
                             <div className="mb-3">
                                <h5><label>Account Type :</label></h5>
                                <input type="text" className="form-control" name="accountType" value={accountType} onChange={(e) => setAccountType(e.target.value)} placeholder="accountType" required/>
                             </div>

                             <div className="mb-3">
                                <h5><label>First Name :</label></h5>
                                <input type="text" className="form-control" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="firstName" required/>
                             </div>

                             <div className="mb-3">
                                <h5><label>Last Name :</label></h5>
                                <input type="text" className="form-control" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="lastName" required/>
                             </div>

                             <div className="mb-3">
                                <h5><label>Email Id :</label></h5>
                                <input type="email" className="form-control" name="emailId" value={emailId} onChange={(e) => setEmailId(e.target.value)} placeholder="emailId" required/>
                             </div>

                             <div className="mb-3">
                                <h5><label>Mobile Number :</label></h5>
                                <input type="text" className="form-control" name="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="mobileNumber" maxLength={10} minLength={10} required/>
                             </div>
                             </div>
                             <div style={{width: '50%'}}>
                             <div className="mb-3">
                                <h5><label>Address :</label></h5>
                                <input type="text" className="form-control" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="address" required/>
                             </div>

                             <div className="mb-3">
                                <h5><label>State :</label></h5>
                                <input type="text" className="form-control" name="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="state" required/>
                             </div>

                             <div className="mb-3">
                                <h5><label>Country :</label></h5>
                                <input type="text" className="form-control" name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="country" required/>
                             </div>

                             <div className="mb-3">
                                <h5><label>PanNumber :</label></h5>
                                <input type="text" className="form-control" name="panNumber" value={panNumber} onChange={(e) => setPanNumber(e.target.value)} placeholder="panNumber" maxLength={10} minLength={10} required/>
                             </div>

                             <div className="mb-3">
                                <h5><label>Balance :</label></h5>
                                <input type="number" className="form-control" name="balance" value={balance} onChange={(e) => setBalance(e.target.value)} placeholder="balance" required/>
                             </div>

                             </div>
                        </div>
                             <div className="mb-3">
                                <h5><label>Status :</label></h5>
                                <input type="text" className="form-control" name="status" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="status" required />
                             </div>


                                <Button style={{marginLeft:"190px"}} type="submit" className="btn btn-primary">
                                    Submit
                                </Button>
                           <Link to ='/existingAccounts'>
                            <Button style={{marginLeft:"60px"}}>Cancel</Button>
                            </Link>
                            <br/>
                      </form>
                    </div>
                </div>
             </div>
         </div>
  )
}

export default AddAccount