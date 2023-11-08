import axios from "axios";
import Cookies from 'js-cookie';


const BANKING_BASE_REST_API_URL='http://localhost:8080/api/admindashboard';
const DebitapprovalServiceHooks = (url) => {

  const getDebitapprovalHistory=async()=>{
    return await axios.get(BANKING_BASE_REST_API_URL+'/DebitapprovalsHistory');
  }
  const getDebitapprovedHistory=async()=>{
    return await axios.get(BANKING_BASE_REST_API_URL+'/DebitapprovedHistory');
  }
  const updatestatus=async(debitapproval)=>
  { 
      console.log("Approving.."+debitapproval);
      return await axios.post(BANKING_BASE_REST_API_URL+'/updatestatus',debitapproval);
  }


return {getDebitapprovalHistory,getDebitapprovedHistory,updatestatus}
}

export default DebitapprovalServiceHooks