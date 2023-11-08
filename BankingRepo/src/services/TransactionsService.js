import { ContactSupportOutlined } from "@mui/icons-material";
import axios from "axios";
import Cookies from 'js-cookie';

const BANKING_BASE_REST_API_URL = 'http://localhost:8080/api/user';
const token = Cookies.get('token');

const BankingServiceHooks = (url) => {

  const depositTransaction = async (accountNo, amount) => {
    console.log(token);
    return await axios.put(
      BANKING_BASE_REST_API_URL + '/transactions/deposit/' + accountNo + '/' + amount,
      {},
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    );
  }

  const debitWithDrawalTransaction = async (debitNo, amount) => {
    return await axios.put(
      BANKING_BASE_REST_API_URL + '/transactions/debitWithDrawal/' + debitNo + '/' + amount,
      {},
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    );
  }

  const creditWithDrawalTransaction = async (creditNo, amount) => {
    return await axios.put(
      BANKING_BASE_REST_API_URL + '/transactions/creditPayment/' + creditNo + '/' + amount,
      {},
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    );
  }

  const getCreditBill = async (creditNo) => {
    return await axios.get(
      BANKING_BASE_REST_API_URL + '/getCreditBill/' + creditNo,
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    );
  }

  const payCreditBill = async (creditNo, bill) => {
    return await axios.put(
      BANKING_BASE_REST_API_URL + '/payCreditBill/' + creditNo + "/" + bill,
      {},
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    );
  }

  const transferTransaction = async (accountNo, accountNoTo, amount) => {
    return await axios.put(
      BANKING_BASE_REST_API_URL + '/transactions/transfer/' + accountNo + '/' + accountNoTo + '/' + amount,
      {},
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    );
  }

  const getTransactionHistory = async (accountNo) => {
    return await axios.get(
      BANKING_BASE_REST_API_URL + '/transactionHistory/' + accountNo,
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    );
  }

  const checkIfLoanExistsByLoanId = async (loanId) => {
    return await axios.get(
      BANKING_BASE_REST_API_URL + '/checkIfLoanExistsByLoanId/' + loanId,
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    );
  }

  const getLoanInstallment = async (loanId) => {
    return await axios.get(
      BANKING_BASE_REST_API_URL + '/getInstallmentByLoanId/' + loanId,
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    );
  }

  const payLoanTransaction = async (loanId, accountNo) => {
    return await axios.put(
      BANKING_BASE_REST_API_URL + '/payLoanTransaction/' + loanId + "/" + accountNo,
      {},
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    );
  }
  
  return {
    depositTransaction, debitWithDrawalTransaction, creditWithDrawalTransaction, getCreditBill,
    payCreditBill, transferTransaction, getTransactionHistory,
    checkIfLoanExistsByLoanId, getLoanInstallment, payLoanTransaction
  }

}


export default BankingServiceHooks