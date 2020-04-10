export const apiAccessTypes = {
  SHARED: 'shared',
  EMPLOYEE: 'employee',
  CUSTOMER: 'customer',
};

const apiHost = 'http://localhost:3001/api';

export const resourcePaths = {
  [apiAccessTypes.SHARED]: {
    auth: {
      login: () => `${apiHost}/v1/login`,
      logout: () => `${apiHost}/v1/logout`,
      register: () => `${apiHost}/v1/register`,
    },
    categories: {
      one: (id, pathParams = '') => `${apiHost}/v1/categories/${id}${pathParams}`,
      many: (pathParams = '') => `${apiHost}/v1/categories/${pathParams}`,
    },
    products: {
      one: (id, pathParams = '') => `${apiHost}/v1/products/${id}${pathParams}`,
      many: (pathParams = '') => `${apiHost}/v1/products/${pathParams}`,
    },
    store: () => `${apiHost}/v1/store`,
  },
  [apiAccessTypes.EMPLOYEE]: {
    products: {
      one: (id, pathParams = '') => `${apiHost}/v1/employee/products/${id}${pathParams}`,
      many: (pathParams = '') => `${apiHost}/v1/employee/products/${pathParams}`,
    },
    categories: {
      one: (id, pathParams = '') => `${apiHost}/v1/employee/categories/${id}${pathParams}`,
      many: (pathParams = '') => `${apiHost}/v1/employee/categories/${pathParams}`,
    },
    items: {
      one: (id, pathParams = '') => `${apiHost}/v1/employee/items/${id}${pathParams}`,
      many: (pathParams = '') => `${apiHost}/v1/employee/items/${pathParams}`,
    },
    rentals: {
      one: (id, pathParams = '') => `${apiHost}/v1/employee/rentals/${id}${pathParams}`,
      many: (pathParams = '') => `${apiHost}/v1/employee/rentals/${pathParams}`,
      accept: (id) => `${apiHost}/v1/employee/rentals/${id}/accept`,
      reject: (id) => `${apiHost}/v1/employee/rentals/${id}/reject`,
      finalize: (id) => `${apiHost}/v1/employee/rentals/${id}/finalize`,
      cancel: (id) => `${apiHost}/v1/employee/rentals/${id}/cancel`,
    },
    accounts: {
      one: (id, pathParams = '') => `${apiHost}/v1/employee/accounts/${id}${pathParams}`,
      many: (pathParams = '') => `${apiHost}/v1/employee/accounts/${pathParams}`,
    },
  },
  [apiAccessTypes.CUSTOMER]: {
    rentals: {
      one: (id, pathParams = '') => `${apiHost}/v1/customer/rentals/${id}${pathParams}`,
      many: (pathParams = '') => `${apiHost}/v1/customer/rentals/${pathParams}`,
    },
  },
};
