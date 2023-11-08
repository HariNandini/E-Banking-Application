import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import HomePageComponent from './components/HomePageComponent';
import NavbarComponent from './components/NavbarComponent';
import Login from './components/Login';
import Aboutus from './components/Aboutus';
import Support from './components/Support';
import Profile from './components/Profile';
import RegistrationForm from './components/Registration/RegistrationForm';
import EmailVerification from './components/Registration/EmailVerification';
import Footer from './components/Footer';

import FinalApproval from './components/Registration/FinalApproval';
import Passwordset from './components/Registration/Passwordset';
import LoanEligibility from './components/PersonalLoanPages/LoanEligibility';
import ApplyLoan from './components/PersonalLoanPages/ApplyLoan';
import DebitHomePage from './components/DebitCardPages/DebitHomePage';
import TransactionHistory from './components/TransactionHistory'
import Applydebitcard from './components/DebitCardPages/Applydebitcard';
import SetorResetpin from './components/DebitCardPages/SetorResetpin';
import Blockdebitcard from './components/DebitCardPages/Blockdebitcard';
import LoanCalculator from './components/PersonalLoanPages/LoanCalculator';
import Transaction from './components/Transaction';
import Unblockdebitcard from './components/DebitCardPages/Unblockdebitcard';
import Applycreditcard from './components/CreditCardPages/Applycreditcard';
import BlockCreditCard from './components/CreditCardPages/BlockCreditCard';
import UnBlockCreditCard from './components/CreditCardPages/UnblockCreditCard';
import CreditSetorResetpin from './components/CreditCardPages/CreditSetorResetPin';
import CreditHomePage from './components/CreditCardPages/CreditHomePage';

import AddAccount from './components/admindashboard/AddAccount';
import ViewAccount from './components/admindashboard/ViewAccount';

import AccountList from './components/admindashboard/AccountList';
 
import LoginPage from './components/admin/LoginPage';
import Debitapprovals from './components/admindashboard/DebitApprovals';
import Loanapprovals from './components/admindashboard/LoanApprovals';
import AdminNavbar from './components/admindashboard/AdminNavbar';
import CreditApprovals from './components/admindashboard/CreditApprovals';
import AdminDashboardpage from './components/admindashboard/AdminDashboardpage';


function App() {
  return (
    <div className='body'>

      <Router basename="/user">
      <NavbarComponent/>
      <div className='container'>
        <Routes>
          <Route path='/' exact element={<HomePageComponent/>}></Route>
          <Route path='/login' exact element={<Login/>}></Route>
          <Route path='/aboutus' exact element={<Aboutus/>}></Route>
          <Route path='/support' exact element={<Support/>}></Route>
          <Route path='/profile' exact element={<Profile/>}></Route>
          <Route path='/FinalApproval' exact element={<FinalApproval/>}></Route>
          <Route path='/register' exact element={<RegistrationForm/>}></Route>
          <Route path='/verify' element={<EmailVerification/>}></Route>
          <Route path='/passwordset' element={<Passwordset/>}></Route>
          <Route path='/verified' element={<FinalApproval />}></Route>
          <Route path='/loanEligibility' element={<LoanEligibility/>}></Route>
          <Route path='/applyLoan' element={<ApplyLoan/>}></Route>
          <Route path='/loanCalculator' element={<LoanCalculator/>}></Route>
          <Route path='/debitHomePage' exact element={<DebitHomePage/>}></Route>
          <Route path='/transactionHistory' exact element={<TransactionHistory/>}></Route>
          <Route path='/applydebitcard' exact element={<Applydebitcard/>}></Route>
          <Route path='/setorresetpin' exact element={<SetorResetpin/>}></Route>
          <Route path='/blockcard' exact element={<Blockdebitcard/>}></Route>
          <Route path='/Unblockcard' exact element={<Unblockdebitcard/>}></Route>
          <Route path='/transaction' element={<Transaction/>}></Route>
          <Route path='/applycreditcard' exact element={<Applycreditcard/>}></Route> 
          <Route path='/blockCreditcard' exact element={<BlockCreditCard/>}></Route>
          <Route path='/unBlockCreditcard' exact element={<UnBlockCreditCard/>}></Route>
          <Route path='/creditSetorResetpin' exact element={<CreditSetorResetpin/>}></Route> 
          <Route path='/creditHomePage' exact element={<CreditHomePage/>}></Route>   
          
        </Routes>
      </div>
      <Footer/>
      </Router>
      
      <Router basename="/admindashboard">
      <AdminNavbar/>
      <div className='container'>
        <Routes>
          <Route path='/login' exact element={<LoginPage/>}></Route>      
          <Route path='/existingAccounts' exact element={<AccountList/>}></Route>
          <Route path='/addAccount' element={<AddAccount/>}></Route>
          <Route path='/DebitapprovalsHistory' element={<Debitapprovals/>}></Route>
          <Route path ='/CreditapprovalsHistory' element={<CreditApprovals/>}></Route>
          <Route path='/LoanapprovalsHistory' element={<Loanapprovals/>}></Route>
          <Route path='/aboutus' element={<Aboutus/>}></Route>
          <Route path='/viewAccount/:id' element={<ViewAccount/>}></Route>
          <Route path ='/updateAccount/:id' element={<AddAccount/>}></Route>
          <Route path ='/' element={<AdminDashboardpage/>}></Route>
          
        </Routes>
      </div>
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
