/* eslint-disable no-undef */
import React, { useState } from 'react';
import styled from './style.module.css';
import CreditCard from '../../../assets/images/credit-card.png';
import GooglePay from '../../../assets/images/google-pay.png';
import ApplePay from '../../../assets/images/apple-pay.png';
import PayPal from '../../../assets/images/Paypal-logo.png';
import Sofort from '../../../assets/images/Sofort.png';
import BankTransfer from '../../../assets/images/logo-vorkasse.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/fontawesome-free-solid';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { userCointransactionAction } from '../../../store/slices/userAuth/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../../providers/useUser';

const PaymentMethod = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bonus, setBonus] = useState();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const { token } = useUser();
  const params = ['id', 'packageName', 'noOfCoins', 'amount'];
  const paramValues = {};
  for (const param of params) {
    paramValues[param] = queryParams.get(param);
  }

  const handleBonus = (e, bonusCode) => {
    e.preventDefault();
    const payload = {
      actionType: 'BonusCode',
      bonus: bonusCode
    };
    dispatch(userCointransactionAction(payload))
      .then(unwrapResult)
      .then((result) => {
        toast.success('Coins added successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error('Bonus Code Invalid or Expired!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const { id, packageName, noOfCoins, amount } = paramValues;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const getPaymentUrl = () => {
    const baseUrl = 'https://';
    const commonUrlParams =
      'project=1pc5-zeliz-30e97baf&testmode=1&theme=x2&bgcolor=ebebeb&title=zizle&producttype=product&paytext=to+buy';
    const customizeParams = `amount=${amount * 100}&token=${token}&id=${id}`;
    switch (selectedPaymentMethod) {
      case 'credit':
        return `/paymentStripe`;
      case 'paypal':
        return `${baseUrl}paypal.micropayment.ch/paypal/event/?${commonUrlParams}&currency=EUR&seal=f5f6ca40e4199acf547ca0d259347c1a&${customizeParams}`;
      //`${baseUrl}paypal.micropayment.ch/paypal/event/?${commonUrlParams}&currency=EUR&amount=5000&seal=f5f6ca40e4199acf547ca0d259347c1a`;
      case 'bankTransfer':
        return `${baseUrl}prepayment.micropayment.ch/prepay/event/?${commonUrlParams}&seal=63022c2ddc7b2cc4db1fef52714e7a46&${customizeParams}`;
      case 'sofort':
        return `${baseUrl}directbanking.micropayment.ch/sofort/event/?${commonUrlParams}&seal=13989bf4f7cf28cd4cc18b2917bae894&${customizeParams}`;
      default:
        return '#';
    }
  };
  const url = `${getPaymentUrl()}`;

  return (
    <div>
      <div className={styled.paymentMethodUi}>
        <div className={styled.paymentMethodList}>
          <h3>
            Choose one <span>payment method</span>
          </h3>
          <ul>
            <li>
              <div className={styled.cardDetails}>
                <input
                  type='radio'
                  id='creditcard'
                  name='paymentmethods'
                  value='Credit Card'
                  onChange={() => setSelectedPaymentMethod('credit')}
                />
                <label for='creditcard'>Credit Card</label>
                <br />
                <p>Sale payment</p>
              </div>
              <div className={styled.cardDetailsImg}>
                <img src={CreditCard} alt='' />
                <img src={GooglePay} alt='' />
                <img src={ApplePay} alt='' />
              </div>
              <div className={styled.clear}></div>
            </li>
            <li>
              <div className={styled.cardDetails}>
                <input
                  type='radio'
                  id='paypal'
                  name='paymentmethods'
                  value='PayPal'
                  onChange={() => setSelectedPaymentMethod('paypal')}
                />
                <label for='paypal'>PayPal</label>
                <br />
                <p>Sale payment</p>
              </div>
              <div className={styled.cardDetailsImg}>
                <img src={PayPal} alt='' />
              </div>
              <div className={styled.clear}></div>
            </li>
            <li>
              <div className={styled.cardDetails}>
                <input
                  type='radio'
                  id='immediately'
                  name='paymentmethods'
                  value='Immediately'
                  onChange={() => setSelectedPaymentMethod('sofort')}
                />
                <label for='immediately'>Immediately</label>
                <br />
                <p>Sale payment</p>
              </div>
              <div className={styled.cardDetailsImg}>
                <img src={Sofort} alt='' />
              </div>
              <div className={styled.clear}></div>
            </li>
            <li>
              <div className={styled.cardDetails}>
                <input
                  type='radio'
                  id='directtransfer'
                  name='paymentmethods'
                  value='Payment in advance'
                  onChange={() => setSelectedPaymentMethod('bankTransfer')}
                />
                <label for='directtransfer'>Payment in advance</label>
                <br />
                <p>Sale payment</p>
              </div>
              <div className={styled.cardDetailsImg}>
                <img src={BankTransfer} alt='' />
              </div>
              <div className={styled.clear}></div>
            </li>
          </ul>
        </div>
        <div className={styled.couponPackage}>
          <div className={styled.couponForm}>
            <h3>discount code</h3>
            <form>
              <input type='text' value={bonus} onChange={(e) => setBonus(e.target.value)} />
              <button onClick={(e) => handleBonus(e, bonus)}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
          <div className={styled.packagesList}>
            <div className={styled.packages}>
              <div className={styled.packageTitle}>
                <h2>{packageName && packageName}</h2>
                <h3>{noOfCoins && noOfCoins} Coins</h3>
                <hr />
                <h5>
                  <p>total ammount:</p> € {amount && amount}
                </h5>
                <p className={styled.packagepara}>
                  By submitting this form, I agree to the Terms of Use and Privacy Policy.
                </p>
              </div>
              <button
                className={styled.yourButtonClassName}
                disabled={!selectedPaymentMethod}
                onClick={() => {
                  if (selectedPaymentMethod === 'paypal') {
                    navigate('/paymentPayPal', { state: { item: paramValues } });
                  } else {
                    navigate(url, { state: { item: paramValues } });
                  }
                }}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
        <div className={styled.clear}></div>
      </div>
    </div>
  );
};

export default PaymentMethod;
