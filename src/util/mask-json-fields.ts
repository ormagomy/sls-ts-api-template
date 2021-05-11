const sensitiveFields = new Set(['token, password', 'authorization']);

export const createJsonMasker = (key: string, value: any) => {
  const replacer = (key: string, value: any) =>
    sensitiveFields.has(key.toLowerCase()) ? '*********' : value;

  if (key === 'data') {
    const parsedValue = JSON.parse(value);
    const maskedValue = JSON.stringify(parsedValue, replacer);
    return maskedValue;
  }

  if (key === 'authorization') {
    return replacer(key, value);
  }

  return value;
};
