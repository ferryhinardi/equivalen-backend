require('dotenv').config(); // magic

const XENDIT = {
  host: process.env.XENDIT_HOST || 'https://api.xendit.co',
  secretKey: process.env.XENDIT_SECRET_KEY || 'xnd_development_OYiFfL4thLX5wc44KrcaEjaZMNOi9YR9kn3l+Rxg+23V+renDw91hA==:',
  emailBuyer: process.env.EMAIL_BUYER || 'dev@pt-gps.com',
};

export default XENDIT;
