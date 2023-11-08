import React from 'react'
import image from '../../img/credit-image.jpg';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

function CreditHomePage() {
  return (
    <div>
      <div style={{marginTop:"90px"}}>
        <h1>Credit Card Services</h1>
      </div>
      <div style={{marginTop:"30px",display: 'flex', flexDirection: 'row', marginBottom: "50px", gap: '30px'}}>
          <div>
            <p>Credit cards are a convenient way to make immediate payments for any expense, in a cashless manner. Thanks to credit cards, you can fulfil your needs even if you don’t have ready cash on hand. There is no need to put off for later what you want to buy now.</p>
            <p> It could be buying the latest mobile phone, booking airline tickets for your upcoming holiday, paying for dinner at a classy restaurant with your family or friends or even buying your monthly groceries.</p>
            <p> Just swipe the card now and clear your credit card bill later! Choose from list of credit cards and apply for credit card that suited best for your needs. </p>
        </div>
        <div>
          <img 
            height={300} width={500}  alt="First slide"
            src={image}
          />
        </div>
      </div>
      <div style={{marginTop:"20px", marginBottom: "80px"}}>
        <h4>Frequently Asked Questions</h4><br/>
        <div style={{width: "1200px"}}>
          <Accordion defaultActiveKey={['0']} alwaysOpen >
            <Accordion.Item eventKey="0">
              <Accordion.Header className='AccordionHeader'><h5>How to apply for a credit card</h5></Accordion.Header>
              <Accordion.Body>
                <Link to='/applycreditcard'>Click here to apply</Link>  or follow the following steps.
                <ul>
                  <li>Step 1 – Visit our website’s home page</li>
                  <li>Step 2 – Go to Cards -&gt; Credit Cards -&gt; Apply Credit Card</li>
                  <li>Step 3 – Scroll down to view the types of credit cards we offer.</li>
                  <li>Step 4 – Click on the “Apply Now” button</li>
                  <li>Step 5 – Fill up the online form to apply for your credit card</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className='AccordionHeader'><h5>Block or Unblock your card</h5></Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li><Link to= '/blockCreditcard'>Click here</Link> to block your card or follow the below steps</li>
                      <ul>
                        <li>Step 1 – Visit our website’s home page</li>
                        <li>Step 2 – Go to Cards -&gt; Credit Cards -&gt; Block Credit Card</li>
                        <li>Step 3 – Click on the button</li>
                        <li>Step 4 – Fill up the online form to block your credit card</li>
                    </ul>
                  <li><Link to= '/unBlockCreditcard'>Click here</Link> to unblock your card</li>
                      <ul>
                        <li>Step 1 – Visit our website’s home page</li>
                        <li>Step 2 – Go to Cards -&gt; Credit Cards -&gt; UnBlock Credit Card</li>
                        <li>Step 3 – Click on the button</li>
                        <li>Step 4 – Fill up the online form to unblock your credit card</li>
                      </ul>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header className='AccordionHeader'><h5>What is the purpose of a Credit Card?</h5></Accordion.Header>
              <Accordion.Body>
                <ul>
                A Credit Card allows you to buy products and services on credit, 
                while you can pay for the same at a later date. It enables you to make purchases 
                instantly and you do not have to postpone your expenses due to a lack of cash at hand or if you have limited funds in your Savings Account.
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header className='AccordionHeader'><h5>How does a Credit Card Work?</h5></Accordion.Header>
              <Accordion.Body>
                {/*<ul>
                  <li>Never share your credit card number, PIN, or CVV with anyone</li>
                  <li>Do not write your credit card PIN anywhere on the card. Try to memorize your PIN</li>
                  <li>Keep changing your credit card PIN at frequent intervals</li>
                  <li>While making a transaction at the ATM, ensure that there’s no one else in the room except you</li>
                  <li>Always hide the PIN while you’re entering it for PoS transactions</li>
                  <li>Register for SMS alerts for any amount above zero</li>
                  <li>Never leave an ATM until your transaction is complete</li>
                  <li>Keep your cash and credit card safely in your purse or bag before leaving an ATM</li>
                  <li>Look for a skimming device being installed in an ATM before using it</li>
                  <li>Never share your OTP with anyone while conducting online transactions</li>
                  <li>In case of any problem while transacting at an ATM, call the security guard. Never ask for help from any stranger</li>
                  <li>Check the safety credentials of a website before using your credit card for an online transaction</li>
                  <li>In case you lose your credit card, call your bank’s customer helpline number immediately to block your credit card</li>
  </ul>*/}
  <ul>When you swipe a Credit Card, the bank makes the payment to the 
            merchants/retailers on your behalf. Unlike a debit card, it does not debit 
            money from your account immediately. Instead, it sends you an itemised 
            bill for your Credit Card expenses, which you can repay on or before the 
            Credit Card due date.</ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header className='AccordionHeader'><h5>Do's when using Credit Card</h5></Accordion.Header>
              <Accordion.Body>
               <ul>
                <li>There are a wide range of credit cards meant to suit every budget and catering to customers with varying needs. Do a thorough research and find out about the interest rates,
                    credit limits, grace period, etc before zeroing in on a credit card. </li>
                <li>Read the terms and conditions before you apply for credit card. Some credit cards may have no annual fee, while some may have an annual fee but waive it off if the spend on the card crosses a certain threshold during in a year. Some credit cards may waive
                    off the annual fee in the first year, but introduce it in the subsequent years. </li>
                 <li>If your bank sends communication about an increase in credit card interest rates, make a note of it and keep track of your payments.</li>
                 <li>Ensure you repay the entire credit card outstanding in full every month. This will keep your credit card spends under check and build your credit score over the long term.</li>
                 <li>If you are unable to repay in full, convert your transaction into an EMI and repay regularly. This will help you save on interest and penalty on delayed payment.</li>
                 <li>Keep your credit utilisation ratio to 30-40% of your credit limit as it reflects positively in your credit report.</li>
                 <li>Keep track of your payment date and credit period to avoid delay in payment or default.</li>
                 <li>Opt for receiving credit card alerts from your bank. This will help keep track of your payments as well as detect any fraudulent transaction in time and take timely action.</li>
                 <li>Block your card immediately if you misplace it or if it gets stolen to prevent misuse.</li>
                 <li>If you notice any fraudulent transaction in your card statement, lodge a complaint with your bank immediately as disputed complaint.</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header className='AccordionHeader'><h5>Dont's when using Credit Card</h5></Accordion.Header>
              <Accordion.Body>
               <ul>
                 <li> Don’t go overboard with your card spends. If you are unable to repay the outstanding amount,
                      you may find yourself with a huge debt burden. </li>
                 <li>Don’t pay only the minimum amount due on your credit card every month. By doing this and carrying forward the remaining 
                    amount for the next month, you may end up with a huge credit card outstanding.</li>
                 <li>Don’t apply for too many credit cards as it will be reflect negatively in your credit history.</li>
                 <li>Don’t utilise your entire credit limit every month as it will reflect negatively in your credit score and show you as credit hungry.</li>
                 
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  )
}


export default CreditHomePage