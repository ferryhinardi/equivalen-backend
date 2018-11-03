require('dotenv').config(); // magic

const XENDIT = {
  xenditHost: process.env.XENDIT_HOST || 'https://api.xendit.co',
  xenditSecretKey: process.env.XENDIT_SECRET_KEY || 'xnd_development_OYiFfL4thLX5wc44KrcaEjaZMNOi9YR9kn3l+Rxg+23V+renDw91hA==:',
};

export default XENDIT;
