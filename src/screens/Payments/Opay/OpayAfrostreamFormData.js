import EnvironmentVariables from '../../../config/env';

export const OpayAfrostreamFormData = async props => {
  let planId = props[0];
  let countryId = props[1];
  let customerEmail = props[2];

  const opayFormData = new FormData();
  opayFormData.append('plan_id', planId);
  opayFormData.append('payment_purpose', 'afrostream_subscription');
  opayFormData.append(
    'cancel_subscription_url',
    'https://myafrostream.tv/user',
  );
  opayFormData.append('is_retailer', '1');
  opayFormData.append('customer_country_id', countryId);
  opayFormData.append('customer_email', customerEmail);
  opayFormData.append('callback_url', EnvironmentVariables.OPAY_CALLBACK_URL);

  return { opayFormData };
};
