import url from 'url';
import qs from 'querystring';

export const getQueries = (urlSearch) => {
  const { search } = url.parse(urlSearch);
  const params = (search || urlSearch).replace('?', '');

  return qs.parse(params);
};

export default getQueries;
