import EnvironmentVariables from '../../../config/env';

export const AfrostreamFormData = async props => {
  let planId = props[0];
  let countryId = props[1];
  let customerEmail = props[2];

  const paystackFormData = new FormData();
  paystackFormData.append('plan_id', planId);
  paystackFormData.append('payment_purpose', 'afrostream_subscription');
  paystackFormData.append(
    'cancel_subscription_url',
    'https://myafrostream.tv/user',
  );
  paystackFormData.append('is_retailer', '1');
  paystackFormData.append('customer_country_id', countryId);
  paystackFormData.append('customer_email', customerEmail);
  paystackFormData.append(
    'callback_url',
    EnvironmentVariables.PAYSTACK_CALLBACK_URL,
  );

  return { paystackFormData };
};
