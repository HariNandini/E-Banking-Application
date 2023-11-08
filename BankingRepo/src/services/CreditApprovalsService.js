import axios from "axios";
const BANKING_BASE_REST_API_URL='http://localhost:8080/api/admindashboard';
const CreditapprovalServiceHooks = (url) => {

  const getCreditapprovalHistory=async()=>{
    return await axios.get(BANKING_BASE_REST_API_URL+'/CreditapprovalsHistory');
  }
  const getCreditapprovedHistory=async()=>{
    return await axios.get(BANKING_BASE_REST_API_URL+'/CreditApprovedHisory');
  }
  const creditUpdatestatus=async(creditapproval)=>
  {
      console.log("Approving..");
      return await axios.post(BANKING_BASE_REST_API_URL+'/creditupdatestatus',creditapproval);
  }


return {getCreditapprovalHistory,getCreditapprovedHistory,creditUpdatestatus}
}

export default CreditapprovalServiceHooks