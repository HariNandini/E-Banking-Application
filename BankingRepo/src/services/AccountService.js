import axios from "axios";
const BANKING_BASE_REST_API_URL='http://localhost:8080/api';
const useAccountService = (url) => {
  
  const getAccounts=async()=>{
    return await axios.get(BANKING_BASE_REST_API_URL+'/admindashboard/accounts')
  }

  const getAccountDetails=async(emailId)=>{
    return await axios.get(BANKING_BASE_REST_API_URL+'/user/login/'+emailId)  
  }

  const getDebitDetails=async(accountNo)=>{
    return await axios.get(BANKING_BASE_REST_API_URL+'/user/login/getDebitDetails/'+accountNo)
  }

  const getCreditDetails=async(accountNo)=>{
    return await axios.get(BANKING_BASE_REST_API_URL+'/user/login/getCreditDetails/'+accountNo)
  }

  const getLoanDetails=async(cardNo)=>{
    return await axios.get(BANKING_BASE_REST_API_URL+'/user/login/getLoanDetails/'+cardNo)
  }

   const addAccount=async(account)=>
  {
      console.log("accservice accdata:"+account);
      return await axios.post(BANKING_BASE_REST_API_URL+'/admindashboard/addAccount',account);
  }
  
  const updateAccount=async(id,account)=>
  {
    return await axios.put(BANKING_BASE_REST_API_URL+'/admindashboard/updateAccount/'+id,account);
  } 
  
  const getAccountById=async(id)=>{
    return await axios.get(BANKING_BASE_REST_API_URL+'/admindashboard/getAccountById/'+ id);
  }

  const deleteAccount=async(id)=>{
    return await axios.delete(BANKING_BASE_REST_API_URL+'/admindashboard/deleteAccount/'+id);
}

  return {getAccounts,addAccount,updateAccount,getAccountById,deleteAccount, getAccountDetails, getDebitDetails, getCreditDetails, getLoanDetails}

}


export default useAccountService;