import React from 'react';
import { FlutterwaveInit, PayWithFlutterwave } from 'flutterwave-react-native';
import EnvironmentVariables from '../../config/env';

export const FlutterwavePayment = async (...props) => {
  //   console.log(props);
  const customer_phone_number = props[0];
  const customer_country_id = props[1];
  const isAfrocinemaActive = props[2];
  const selectedData = props[3];
  const retailerData = props[4];

  const handleOnRedirect = () => {
    console.log('sadi');
  };

  const generateRef = length => {
    var a =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split(
        '',
      );
    var b = [];
    for (var i = 0; i < length; i++) {
      var j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join('');
  };

  try {
    // Initialize Payment
    const paymentLink = await FlutterwaveInit({
      onRedirect: handleOnRedirect(),
      tx_ref: generateRef(11),
      authorization: EnvironmentVariables.FLUTTERWAVE_PUBLIC_KEY,
      amount: isAfrocinemaActive
        ? selectedData.premier.discounted_charging_price // Afrocinema data
        : selectedData.discounted_charging_price, // Afrostream data
      currency: isAfrocinemaActive
        ? selectedData.premier.charging_currency // Afrocinema data
        : selectedData.charging_currency, // Afrostream data
      payment_options:
        'card,account,mobilemoneyghana,mobilemoneyuganda,mobilemoneyrwanda,mobilemoneyzambia,mpesa,barter,ussd,banktransfer,mobilemoneyfranco,alipay,mcash,cryptocurrency,paga,mobilemoneytanzania',
      customer: {
        email: retailerData.email,
        // phone_number: retailerData.phone_number,
        // name: retailerData.name,
      },
      meta: {
        id: isAfrocinemaActive
          ? selectedData.id // Afrocinema video_id
          : selectedData.id, // Afrostream plan_id
        cancel_subscription_url: isAfrocinemaActive
          ? ''
          : 'https://myafrostream.tv/user',
        payment_purpose: isAfrocinemaActive
          ? 'afrocinema_premier'
          : 'afrostream_subscription',
        customer: {
          // the customer the retailer is paying for
          country_id: customer_country_id,
          phone_number: customer_phone_number,
        },
      },
    });

    // use payment link
    usePaymentLink(paymentLink);
  } catch (error) {
    // handle payment error
    console.log(error.message);
    // displayError(error.message);
  }

  //   <PayWithFlutterwave
  //     onRedirect={handleOnRedirect}
  //     options={{
  //       tx_ref: generateRef(11),
  //       authorization: EnvironmentVariables.FLUTTERWAVE_PUBLIC_KEY,
  //       amount: isAfrocinemaActive
  //         ? selectedData.premier.discounted_charging_price // Afrocinema data
  //         : selectedData.discounted_charging_price, // Afrostream data
  //       currency: isAfrocinemaActive
  //         ? selectedData.premier.charging_currency // Afrocinema data
  //         : selectedData.charging_currency, // Afrostream data
  //       payment_options: 'card',
  //       customer: {
  //         email: retailerData.email,
  //         // phone_number: retailerData.phone_number,
  //         // name: retailerData.name,
  //       },
  //       meta: {
  //         id: isAfrocinemaActive
  //           ? selectedData.id // Afrocinema video_id
  //           : selectedData.id, // Afrostream plan_id
  //         cancel_subscription_url: isAfrocinemaActive
  //           ? ''
  //           : 'https://myafrostream.tv/user',
  //         payment_purpose: isAfrocinemaActive
  //           ? 'afrocinema_premier'
  //           : 'afrostream_subscription',
  //         customer: {
  //           // the customer the retailer is paying for
  //           country_id: customer_country_id,
  //           phone_number: customer_phone_number,
  //         },
  //       },
  //     }}
  //   />;
};

export default FlutterwavePayment;
