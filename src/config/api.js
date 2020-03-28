export const apiAccessTypes = {
  SHARED: 'shared',
  EMPLOYEE: 'employee',
  CUSTOMER: 'customer'
};

const apiHost = 'http://localhost:3001/api';

// export const paths = {
//   login: {
//     login: () => `${apiHost}/v1/login`,
//     logout: () => `${apiHost}/v1/logout`
//   },
//   register: {
//     register: () => `${apiHost}/v1/register`
//   },
//   category: {
//     multiple: (pathParams = '') => `${apiHost}/v1/categories${pathParams}`,
//     single: (id, pathParams = '') => `${apiHost}/v1/categories/${id}${pathParams}`
//   },
//   product: {
//     multiple: (pathParams = '') => `${apiHost}/v1/products${pathParams}`,
//     single: (id, pathParams = '') => `${apiHost}/v1/products/${id}${pathParams}`
//   },
//   store: {
//     single: () => `${apiHost}/v1/store`
//   }
// };

export const resourcePaths = {
  [apiAccessTypes.SHARED]: {
    auth: {
      login: () => `${apiHost}/v1/login`,
      logout: () => `${apiHost}/v1/logout`,
      register: () => `${apiHost}/v1/register`
    },
    categories: {
      one: (id, pathParams = '') => `${apiHost}/v1/categories/${id}${pathParams}`,
      many: (pathParams = '') => `${apiHost}/v1/categories/${pathParams}`
    },
    products: {
      one: (id, pathParams = '') => `${apiHost}/v1/products/${id}${pathParams}`,
      many: (pathParams = '') => `${apiHost}/v1/products/${pathParams}`
    }
  },
  [apiAccessTypes.EMPLOYEE]: {
    products: {
      one: (id, pathParams = '') => `${apiHost}/v1/employee/products/${id}${pathParams}`,
      many: (pathParams = '') => `${apiHost}/v1/employee/products/${pathParams}`
    },
    categories: {
      one: (id, pathParams = '') => `${apiHost}/v1/employee/categories/${id}${pathParams}`,
      many: (pathParams = '') => `${apiHost}/v1/employee/categories/${pathParams}`
    },
    items: {
      one: (id, pathParams = '') => `${apiHost}/v1/employee/items/${id}${pathParams}`,
      many: (pathParams = '') => `${apiHost}/v1/employee/item/${pathParams}`
    },
    rentals: {
      one: (id, pathParams = '') => `${apiHost}/v1/employee/rentals/${id}${pathParams}`,
      many: (pathParams = '') => `${apiHost}/v1/employee/rentals/${pathParams}`
    }
  },
  [apiAccessTypes.CUSTOMER]: {
    rentals: {
      one: (id, pathParams = '') => `${apiHost}/v1/customer/rentals/${id}${pathParams}`,
      many: (pathParams = '') => `${apiHost}/v1/customer/rentals/${pathParams}`
    }
  }
};
