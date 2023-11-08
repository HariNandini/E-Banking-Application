import axios from "axios";
import Cookies from 'js-cookie';
const BANKING_BASE_REST_API_URL='http://localhost:8080/api/user/applyLoan';
const token = Cookies.get('token');

const useLoanService = (url) => {

   const addLoan=async(loanData)=>
  {
      console.log("loanservice loandata:"+loanData);
      return await axios.post(BANKING_BASE_REST_API_URL,loanData,
        {
          headers: {
            Authorization: 'Bearer ' + token 
          }
        }  

        );
  }

  return {addLoan}

}


export default useLoanService;