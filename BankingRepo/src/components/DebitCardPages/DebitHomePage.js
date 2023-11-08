import React from 'react'
import image from '../../img/DebitHomeImage.jpg';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

function DebitHomePage() {
  return (
    <div>
      <div style={{marginTop:"90px"}}>
        <h1>Debit Card Services</h1>
      </div>
      <div style={{marginTop:"30px",display: 'flex', flexDirection: 'row', marginBottom: "50px", gap: '30px'}}>
          <div>
            <p>In a world going cashless, Debit Cards are your best friends! Free yourself from carrying around rolls of cash everywhere you go. Using a Debit Card is almost as easy as using cash and is more secure and safer. Use them anywhere, anytime.</p>
            <p>A Debit Card can be used as an ATM card for withdrawing cash from any bank’s ATM. It can also be used for making payments by swiping at a merchant’s point-of-sales machine and for online transactions.</p>
            <p>When swiping your Debit Card, you need to key in the PIN. Similarly, when using it for online transactions, you need to key in the OTP that is delivered to your mobile number registered with the bank. This ensures your Debit Card is secure and safe to use.</p>
            <p>Ensure you have enough funds in your Savings Account linked to your Debit Card and swipe it to your heart’s content, to fulfil all your requirements. Set daily and monthly transaction limits on your Debit Card as per your needs. There is no charge or fee for spending money using your Debit Card.</p>
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
              <Accordion.Header className='AccordionHeader'><h5>How to apply for a debit card</h5></Accordion.Header>
              <Accordion.Body>
                <Link to='/applydebitcard'>Click here to apply</Link>  or follow the following steps.
                <ul>
                  <li>Step 1 – Visit our website’s home page</li>
                  <li>Step 2 – Go to Cards -&gt; Debit Cards -&gt; Apply Debit Card</li>
                  <li>Step 3 – Scroll down to view the types of debit cards we offer.</li>
                  <li>Step 4 – Click on the “Apply Now” button</li>
                  <li>Step 5 – Fill up the online form to apply for your debit card</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className='AccordionHeader'><h5>Block or Unblock your card</h5></Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li><Link to= '/blockcard'>Click here</Link> to block your card or follow the below steps</li>
                      <ul>
                        <li>Step 1 – Visit our website’s home page</li>
                        <li>Step 2 – Go to Cards -&gt; Debit Cards -&gt; Block Debit Card</li>
                        <li>Step 3 – Click on the button</li>
                        <li>Step 4 – Fill up the online form to block your debit card</li>
                    </ul>
                  <li><Link to= '/unblockcard'>Click here</Link> to unblock your card</li>
                      <ul>
                        <li>Step 1 – Visit our website’s home page</li>
                        <li>Step 2 – Go to Cards -&gt; Debit Cards -&gt; UnBlock Debit Card</li>
                        <li>Step 3 – Click on the button</li>
                        <li>Step 4 – Fill up the online form to unblock your debit card</li>
                      </ul>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header className='AccordionHeader'><h5>What are the benefits of Easy Way Bank Debit card?</h5></Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Easy cash withdrawal at any bank ATM within limits prescribed by RBI</li>
                  <li>Wide acceptability at merchant establishments across India</li>
                  <li>Acceptability for wide range of online payments including government entities, utility payments, ecommerce websites and apps, etc</li>
                  <li>Built-in safety and security features to ensure protection of your money</li>
                  <li>Benefits such as cashbacks, reward points, fuel surcharge waiver, free airport lounges, personal accident cover, etc*</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header className='AccordionHeader'><h5>Debit Card Safety Tip</h5></Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Never share your debit card number, PIN, or CVV with anyone</li>
                  <li>Do not write your debit card PIN anywhere on the card. Try to memorize your PIN</li>
                  <li>Keep changing your debit card PIN at frequent intervals</li>
                  <li>While making a transaction at the ATM, ensure that there’s no one else in the room except you</li>
                  <li>Always hide the PIN while you’re entering it for PoS transactions</li>
                  <li>Register for SMS alerts for any amount above zero</li>
                  <li>Never leave an ATM until your transaction is complete</li>
                  <li>Keep your cash and debit card safely in your purse or bag before leaving an ATM</li>
                  <li>Look for a skimming device being installed in an ATM before using it</li>
                  <li>Never share your OTP with anyone while conducting online transactions</li>
                  <li>In case of any problem while transacting at an ATM, call the security guard. Never ask for help from any stranger</li>
                  <li>Check the safety credentials of a website before using your debit card for an online transaction</li>
                  <li>In case you lose your debit card, call your bank’s customer helpline number immediately to block your debit card</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header className='AccordionHeader'><h5>Terms and Conditions</h5></Accordion.Header>
              <Accordion.Body>
              Please do not use your Debit Card or online banking facility or any other means for collecting and effecting / remitting payments directly /indirectly outside India in any form towards overseas foreign exchange trading through electronic/internet trading portals. You would be liable for contravention of the Foreign Exchange Management Act (FEMA), 1999 besides being liable for violation of regulations relating to Know Your Customer (KYC) norms / Anti Money Laundering (AML) standards. For further details on this, please refer to RBI Circular: A.P. (DIR Series) Circular No. 46 dated Sep 17, 2013x
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  )
}


export default DebitHomePage