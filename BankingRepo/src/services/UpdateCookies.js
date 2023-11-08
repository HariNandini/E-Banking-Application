import React from "react";
import Cookies from "js-cookie";
import useAccountService from "./AccountService";

const UpdateCookies = () => {
    const { getAccountDetails, getDebitDetails,getCreditDetails, getLoanDetails } = useAccountService();

    const updateAccountCookies = () => {
        // Fetch user details
        const emailId = JSON.parse(window.localStorage.getItem("User"))[0]?.emailId;
        getAccountDetails(emailId).then((response) => {
            const accountsList = response.data;
            console.log(response.data);
            // Store user details in cookies
            const timeout = setTimeout(()=>{
            window.localStorage.setItem("User", JSON.stringify(accountsList));
              console.log(window.localStorage.getItem('User'));
              // window.location.reload();
            },3000)

            return ()=>clearTimeout(timeout)
          }) //account details
          .catch((error) => {
            console.log(error.response.data.message);
          });
    }

    const updateDebitCookies = (accountNo) => {
        let debitList = JSON.parse(window.localStorage.getItem("Debit"));
        debitList.map((debit,idx)=> {
          if(debit.accountNo==accountNo){
            getDebitDetails(accountNo).then((res) => {
              debitList[idx] = res.data;
              })//debit details
              .catch((error) => {
                console.log(error.response.data.message);
              });
              return;
          }//if
        })//map

        const timeout = setTimeout(()=>{
          window.localStorage.setItem("Debit",JSON.stringify(debitList));
          window.location.reload();
        },3000)

        return ()=>clearTimeout(timeout)
    }

    const updateCreditCookies = (accountNo) => {
      let creditList = JSON.parse(window.localStorage.getItem("Credit"));
      creditList.map((credit,idx)=> {
        // console.log("credit.accountNo: "+credit.accountNo+" "+ accountNo)
        if(credit.accountNo==accountNo){
          getCreditDetails(accountNo).then((res) => {
            creditList[idx] = res.data;
            console.log("credit List changed to : " +creditList)
            })//credit details
            .catch((error) => {
              console.log(error.response.data.message);
            });
            return;
        }//if
      })//map

      const timeout = setTimeout(()=>{
        window.localStorage.setItem("Credit",JSON.stringify(creditList));
        window.location.reload();
      },3000)

      return ()=>clearTimeout(timeout)
    }

    const updateLoanCookies = (debitCardNo) => {
      let loanList = JSON.parse(window.localStorage.getItem("Loan"));
      loanList.map((loan,idx)=> {
        if(loan.cardNo==debitCardNo){
          getLoanDetails(debitCardNo).then((res) => {
            loanList[idx] = res.data;
            console.log("Loan List changed to : " +loanList)
            })//loan details
            .catch((error) => {
              console.log(error.response.data.message);
            });
            return;
        }//if
      })//map

      const timeout = setTimeout(()=>{
        window.localStorage.setItem("Loan",JSON.stringify(loanList));
        window.location.reload();
      },3000)

      return ()=>clearTimeout(timeout)
    }

  return {updateAccountCookies, updateDebitCookies, updateCreditCookies, updateLoanCookies}
}

export default UpdateCookies;
