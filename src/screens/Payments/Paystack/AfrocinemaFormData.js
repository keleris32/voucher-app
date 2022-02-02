import EnvironmentVariables from '../../../config/env';

export const AfrocinemaFormData = async props => {
  let videoId = props[0];
  let countryId = props[1];
  let customerEmail = props[2];

  const paystackFormData = new FormData();
  paystackFormData.append('video_id', videoId);
  paystackFormData.append('payment_purpose', 'afrocinema_premier');
  paystackFormData.append('is_retailer', '1');
  paystackFormData.append('customer_country_id', countryId);
  paystackFormData.append('customer_email', customerEmail);
  paystackFormData.append(
    'callback_url',
    EnvironmentVariables.PAYSTACK_CALLBACK_URL,
  );

  return { paystackFormData };
};
