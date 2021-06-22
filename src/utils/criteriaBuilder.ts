export const buildCriteria = (criteria: { search: string; filters: any }) => {
  let url = '';
  if (criteria.search) {
    url += `?search=${criteria.search}`;
  }
  Object.keys(criteria.filters).map((key) => {
    if (criteria.filters[key] !== null) {
      if (!url) {
        url += '?';
      } else url += '&';
      url += `${key}=${criteria.filters[key]}`;
    }
  });
  return url;
};
