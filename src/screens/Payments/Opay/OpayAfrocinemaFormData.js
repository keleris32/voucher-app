import EnvironmentVariables from '../../../config/env';

export const OpayAfrocinemaFormData = async props => {
  let videoId = props[0];
  let countryId = props[1];
  let customerEmail = props[2];

  const opayFormData = new FormData();
  opayFormData.append('video_id', videoId);
  opayFormData.append('payment_purpose', 'afrocinema_premier');
  opayFormData.append('is_retailer', '1');
  opayFormData.append('customer_country_id', countryId);
  opayFormData.append('customer_email', customerEmail);
  opayFormData.append('callback_url', EnvironmentVariables.OPAY_CALLBACK_URL);

  return { opayFormData };
};
