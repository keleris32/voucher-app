import React, { useContext } from 'react';
import { PayWithFlutterwave, FlutterwaveInit } from 'flutterwave-react-native';
import EnvironmentVariables from '../../config/env';
import { GlobalContext } from '../../context/Provider';

const FlutterwaveGateway = async props => {
  const {
    getRetailerState: { retailerData },
  } = useContext(GlobalContext);

  console.log(props.countryId, props.email);

  const {
    selectedCardState: {
      isAfrocinemaActive,
      selectedAfrocinemaData,
      selectedAfrostreamData,
    },
  } = useContext(GlobalContext);

  const handleOnRedirect = () => {
    return;
  };

  const generateTransactionRef = length => {
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

  const paymentLink = await FlutterwaveInit({
    tx_ref: generateTransactionRef(11),
    authorization: EnvironmentVariables.FLUTTERWAVE_PUBLIC_KEY,
    amount: isAfrocinemaActive
      ? selectedAfrocinemaData.premier.discounted_charging_price
      : selectedAfrostreamData.discounted_charging_price,
    currency: isAfrocinemaActive
      ? selectedAfrocinemaData.premier.charging_currency
      : selectedAfrostreamData.charging_currency,
    payment_options: 'card',
    meta: {
      retailer_id: retailerData.id,
      plan_id: isAfrocinemaActive
        ? selectedAfrocinemaData.id
        : selectedAfrostreamData.id,
      cancel_subscription_url: 'https://myafrostream.tv/user',
      payment_purpose: isAfrocinemaActive
        ? 'afrocinema_premier'
        : 'afrostream_subscription',
      customer_country_id: props.countryId,
      customer_email: props.email,
    },
    customer: {
      email: retailerData.email,
      phone_number: retailerData.phone_number,
      name: retailerData.first_name + ' ' + retailerData.last_name,
    },
  });

  console.log('Linkkkk', paymentLink);

  // return (
  //   <>
  //     <PayWithFlutterwave
  //       onRedirect={handleOnRedirect}
  //       options={{
  //         tx_ref: generateTransactionRef(11),
  //         authorization: EnvironmentVariables.FLUTTERWAVE_PUBLIC_KEY,
  //         amount: isAfrocinemaActive
  //           ? selectedAfrocinemaData.premier.discounted_charging_price
  //           : selectedAfrostreamData.discounted_charging_price,
  //         currency: isAfrocinemaActive
  //           ? selectedAfrocinemaData.premier.charging_currency
  //           : selectedAfrostreamData.charging_currency,
  //         payment_options: 'card',
  //         meta: {
  //           retailer_id: retailerData.id,
  //           plan_id: isAfrocinemaActive
  //             ? selectedAfrocinemaData.id
  //             : selectedAfrostreamData.id,
  //           cancel_subscription_url: 'https://myafrostream.tv/user',
  //           payment_purpose: isAfrocinemaActive
  //             ? 'afrocinema_premier'
  //             : 'afrostream_subscription',
  //           customer_country_id: props.countryId,
  //           customer_email: props.email,
  //         },
  //         customer: {
  //           email: retailerData.email,
  //           phone_number: retailerData.phone_number,
  //           name: retailerData.first_name + ' ' + retailerData.last_name,
  //         },
  //       }}
  //     />
  //   </>
  // );
};

export default FlutterwaveGateway;
