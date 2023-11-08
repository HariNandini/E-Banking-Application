import React, {useState, useEffect} from 'react'

 import image1 from '../imgCarousel/image1.jpg'

 import image2 from '../imgCarousel/image2.jpg'

 import image3 from '../imgCarousel/image3.jpg'



import Carousel from 'react-bootstrap/Carousel';

import ApplyDebitCard from './HomePageCards/ApplyDebitCard';

import ApplyCreditCard from './HomePageCards/ApplyCreditCard';

import ApplyPersonalLoanCard from './HomePageCards/ApplyPersonalLoanCard';

import ApplyCarLoanCard from './HomePageCards/ApplyCarLoanCard';

import ApplyBusinessLoanCard from './HomePageCards/ApplyBusinessLoanCard';

import ApplyHomeLoanCard from './HomePageCards/ApplyHomeLoanCard';

import Cookies from 'js-cookie';




const HomePageComponent=()=>{

    const loginStatus= Cookies.get("loginStatus");
    const activeAccount = Cookies.get("ActiveAccount");
    const images = [image1,image2,image3]
    const [user,setUser] = useState()

    useEffect(()=>{
      if(loginStatus){

            const timeout = setTimeout(()=>{

              console.log(window.localStorage.getItem("User"));

            setUser({

              accountNo: activeAccount,

              balance: JSON.parse(window.localStorage.getItem("User"))?.filter((account)=>account.accountNo==activeAccount)[0]?.balance

            })

          },3000)

          return ()=>clearTimeout(timeout)}

      },[])

    return (
      <div style={{'padding': '80px 70px 20px 70px', 'borderRadius': '55px 55px 55px 55px'}} fixed='top'>

        { loginStatus &&

          <>

              <div style={{display: "flex", flexDirection: "row", gap: "600px", fontSize: "20px"}}>

                <div><b>Account No: {user?.accountNo}</b></div>

                <div><b>Account Balance: {user?.balance}</b></div>

              </div>

          </>

         }

        <Carousel>



              {images.map((image, idx) =>(

                <Carousel.Item >

                      <img className="d-block w-100"

                            height={550}  alt="First slide"

                            key={idx} src={image}

                      />

                    <Carousel.Caption>

                      {/* <h3>{idx} slide label</h3>

                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}

                    </Carousel.Caption>

                  </Carousel.Item>

            ))}

        </Carousel><br/><br/>

        <div>

          <h2>Cards</h2><hr/><br/>

          <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>

            <ApplyDebitCard/>

            <ApplyCreditCard/>

          </div>

        </div>

        <div>

          <br/><h2>Loans</h2><hr/><br/>

          <div style={{display: 'flex', flexDirection: 'row', gap: '20px', marginBottom: '20px'}}>

            <ApplyPersonalLoanCard/>

            <ApplyCarLoanCard/>

            <ApplyBusinessLoanCard/>

            <ApplyHomeLoanCard/>

          </div>

            <br/>

          </div>

      </div>

    )



}




export default HomePageComponent;