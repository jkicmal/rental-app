/**
 * order - object of key value pair { columnName: 1 | -1 }, 1 = 'ASC', -1 = 'DESC'
 * relations - array of strings ['relationName']
 * skip - how many elements to skip (pagination)
 * take - how many elements to show (pagination)
 */
export const resourceQueryParamsToPathParams = (resourceQueryParams) => {
  const strings = [];

  for (const key in resourceQueryParams) {
    const paramPath = `${key}=${JSON.stringify(resourceQueryParams[key])}`;
    strings.push(paramPath);
  }

  return `?${strings.join('&')}`;
};
