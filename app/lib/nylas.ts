import Nylas from 'nylas';

const nylasConfig = {
  apiKey: process.env.NYLAS_API_SECRET_KEY as string,
  apiUri: process.env.NYLAS_API_URI as string,
};

export const authConfig = {
  clientId: process.env.NYLAS_CLIENT_ID as string,
  redirectUri: process.env.NEXT_PUBLIC_URL + '/api/oauth/exchange',
  apiKey: process.env.NYLAS_API_SECRET_KEY as string,
  apiUri: process.env.NYLAS_API_URI as string,
};

export const nylas = new Nylas(nylasConfig);
