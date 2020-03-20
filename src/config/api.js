const apiHost = 'http://localhost:3001/api';

export const paths = {
  auth: {
    login: () => `${apiHost}/v1/login`,
    logout: () => `${apiHost}/v1/logout`
  },
  register: {
    register: () => `${apiHost}/v1/register`
  },
  category: {
    multiple: () => `${apiHost}/v1/categories`,
    single: id => `${apiHost}/v1/categories/${id}`
  },
  rental: {
    single: () => `${apiHost}/v1/rental`
  }
};
