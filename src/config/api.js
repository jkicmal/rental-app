const apiHost = 'http://localhost:3001/api';

export const paths = {
  login: {
    login: () => `${apiHost}/v1/login`,
    logout: () => `${apiHost}/v1/logout`,
  },
  register: {
    register: () => `${apiHost}/v1/register`,
  },
  category: {
    multiple: (pathParams = '') => `${apiHost}/v1/categories${pathParams}`,
    single: (id, pathParams = '') => `${apiHost}/v1/categories/${id}${pathParams}`,
  },
  product: {
    multiple: (pathParams = '') => `${apiHost}/v1/products${pathParams}`,
    single: (id, pathParams = '') => `${apiHost}/v1/products/${id}${pathParams}`,
  },
  store: {
    single: () => `${apiHost}/v1/store`,
  },
};
