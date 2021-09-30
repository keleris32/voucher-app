import React, { useContext } from 'react';
import { PayWithFlutterwave, FlutterwaveInit } from 'flutterwave-react-native';
import EnvironmentVariables from '../../config/env';
import { GlobalContext } from '../../context/Provider';

const FlutterwaveGateway = async () => {
  const {
    getRetailerState: { retailerData },
  } = useContext(GlobalContext);

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

  return (
    <>
      <PayWithFlutterwave
        onRedirect={handleOnRedirect}
        options={{
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
            customer_country_id: '06bc6944-2216-40c6-8772-796199e6c2ad',
            customer_email: 'charles.ejiegbu@gmail.com',
          },
          customer: {
            email: retailerData.email,
            phone_number: retailerData.phone_number,
            name: retailerData.first_name + ' ' + retailerData.last_name,
          },
        }}
      />
    </>
  );
};

export default FlutterwaveGateway;
