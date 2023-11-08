import axios from "axios";
const BANKING_BASE_REST_API_URL='http://localhost:8080/api/admindashboard';
const LoanapprovalServiceHooks = (url) => {

//   const depositTransaction=async(accountNo,amount)=>{
//         return await axios.put(BANKING_BASE_REST_API_URL+'/transactions/deposit/'+accountNo+'/'+amount);
//     }
    
//     const withDrawalTransaction=async(accountNo,amount)=>{
//       return await axios.put(BANKING_BASE_REST_API_URL+'/transactions/withDrawal/'+accountNo+'/'+amount);
//   }
//   const transferTransaction=async(accountNo,accountNoTo,amount)=>{
//     return await axios.put(BANKING_BASE_REST_API_URL+'/transactions/transfer/'+accountNo+'/'+accountNoTo+'/'+amount);
//   }
  const getLoanapprovalHistory=async()=>{
    return await axios.get(BANKING_BASE_REST_API_URL+'/LoanapprovalsHistory');
  }
  const getLoanapprovedHistory=async()=>{
    return await axios.get(BANKING_BASE_REST_API_URL+'/LoanapprovedHistory');
  }
  const updateLoanstatus=async(cardNo)=>
  {
      console.log("Approving..");
      return await axios.post(BANKING_BASE_REST_API_URL+'/updateLoanstatus/'+cardNo);
  }
  
//   const getTransactionHistory=async(accountNo)=>{
//     return await axios.get(BANKING_BASE_REST_API_URL+'/transactionHistory/'+accountNo);
//   }
//   return {depositTransaction,withDrawalTransaction, transferTransaction, getTransactionHistory}
return {getLoanapprovalHistory,getLoanapprovedHistory,updateLoanstatus}

}


export default LoanapprovalServiceHooks