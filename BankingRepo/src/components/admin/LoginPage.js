import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';

function LoginPage() {

  const navigate = useNavigate();

  const [adminInfo, setadminInfo] = useState({
    adminname: '',
    password:''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setadminInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(adminInfo.adminname==="Admin"){
        if(adminInfo.password==="Admin@123"){
          Cookies.set("AdminLoginStatus", true);
          navigate('/');
          window.location.reload();
        }
        else
          window.alert("Incorrect password !!")
    }
    else{
        window.alert("Invalid username !!");
    }
    // axios.post('http://localhost:8080/api/login', userInfo)
    //   .then((response) => {
    //     // Handle success
    //     console.log(response);

    //     window.location.href = '/';
    //   })
    //   .catch((error) => {
    //     // Handle error
    //   });

  };

  return (
    <div>
            <div className='row' >
               <div className='card col-md-6 offset-md-3 offset-md-3' style={{'marginTop': '100px', marginBottom: '140px'}}>
                 <div className='card-body'>
                         <center><h3>Log In</h3></center><br/>
                      <form onSubmit={handleSubmit}>
                             <div className="mb-3">
                                <h5><label>Admin Name :</label></h5>
                                <input type="text" className="form-control" name="adminname" value={adminInfo.adminname} onChange={handleChange} placeholder="adminname" required/>
                             </div>

                             <div className="mb-3">
                                <h5><label>Password :</label></h5>
                                <input type="password" className="form-control" name="password" value={adminInfo.password} onChange={handleChange} placeholder="password" required />
                             </div>

                             <center>
                                <Button type="submit" className="btn btn-primary">
                                    Submit
                                </Button>
                            </center><br/>


                      </form>
                    </div>
                </div>
             </div>
         </div>
  );
}

export default LoginPage;