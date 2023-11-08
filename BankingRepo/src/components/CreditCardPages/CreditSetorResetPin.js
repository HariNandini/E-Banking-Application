import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import image from '../../img/debitbg.jpg';
import useUpdateCookies from '../../services/UpdateCookies';


function CreditSetorResetpin() {

  const token = Cookies.get('token');
  const loginStatus= Cookies.get("loginStatus");
  const activeAccount = Cookies.get("ActiveAccount");
  const navigate = useNavigate();
  const[cardNoErr,setCardNoErr]=useState({});
  const[pinNoErr,setPinNoErr]=useState({});
  const [cardpinInfo, setcardpinInfo] = useState();
  const {updateCreditCookies} = useUpdateCookies();

  useEffect(()=>{
    if(!loginStatus)
      navigate("/login");

},[])

useEffect(() => {
  const timeout = setTimeout(() => {
    setcardpinInfo((prevState) => ({
      ...prevState,
      cardNo: JSON.parse(window.localStorage.getItem("Credit")).filter((credit) => credit?.accountNo == activeAccount)[0]?.cardNo,
      pinNo: '',
      status: 'Active',
    }));
  }, []);
  return () => clearTimeout(timeout);
}, [activeAccount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcardpinInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(formValidation()){

    axios.post('http://localhost:8080/api/user/setorresetpinforcredit',cardpinInfo,{
      headers: {
        Authorization: 'Bearer ' + token
      }})

      .then((response) => {

        // Handle success

        updateCreditCookies(activeAccount);

        console.log(cardpinInfo);
        window.alert("Pin has been successfully set.")
        window.location.href = '/';

      })

      .catch((error) => {

        // Handle error

        window.alert(error.response.data.message)

      });

    }
  };

  const formValidation = () => {
    // const cardNoErr = {};
    const pinNoErr = {};

    let isValid = true;

    // if(cardpinInfo?.cardNo.trim().length===0){
    //  cardNoErr.cardNoEmpty = "Card Number is required";
    //  isValid = false;
    // } else if((cardpinInfo?.cardNo.toString().length!==16)){
    //   cardNoErr.cardNolength = "Card Number should be 16 digits";
    //   isValid = false;
    // }
     if(cardpinInfo?.pinNo.trim().length===0){
      pinNoErr.pinNoEmpty = "Pin Number is required";
      isValid = false;
    } else if((cardpinInfo?.pinNo.toString().length!==4)){
      pinNoErr.pinNolength = "Pin Number should be 4 digits";
      isValid = false;
    }
    // setCardNoErr(cardNoErr);
    setPinNoErr(pinNoErr);
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
     {/*<div style={{'display':'flex'}} >
  <div style={{'flex':'1'}}>*/}
            <div className='row' >
               <div className='card col-md-6 offset-md-3 offset-md-3' style={{'margin-top': '130px', marginBottom: '270px',marginLeft:'358px'}}>
                 <div className='card-body'>

                    <form onSubmit={handleSubmit}>
                        <center><h3>Set or Reset Pin</h3></center><br/>

                           <div className="mb-3">
                             <h5><label>Card no</label></h5>
                             <input type="number" className="form-control" name="cardNo" value={cardpinInfo?.cardNo} onChange={handleChange} placeholder="cardNo" readOnly/>
                           </div>

                           {/* {Object.keys(cardNoErr).map((key)=>{
                            return <div style={{color : "red"}}>{cardNoErr[key]}</div>
                            })} */}

                             <div className="mb-3">
                              <h5><label>Enter Pin</label></h5>
                              <input type="number" className="form-control" name="pinNo" value={cardpinInfo?.pinNo} onChange={handleChange} placeholder="pinNo" />
                             </div>

                             {Object.keys(pinNoErr).map((key)=>{
                              return <div style={{color : "red"}}>{pinNoErr[key]}</div>
                             })}

                            <center><Button type="submit" >Set/Reset Pin</Button></center>
                          </form>
                    </div>
                </div>

             </div>
             </div>

         </div>

  );
}

export default CreditSetorResetpin;