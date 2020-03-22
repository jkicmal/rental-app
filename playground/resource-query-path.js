export const resourceQueryParamsToPathParams = (resourceQueryParams) => {
  const strings = [];

  for (const key in resourceQueryParams) {
    const paramPath = `${key}=${JSON.stringify(resourceQueryParams[key])}`;
    strings.push(paramPath);
  }

  return `?${strings.join('&')}`;
};
