export const toKeys = (obj) => {
  if (typeof obj !== "object") {
    console.warn(`The parameter is not a typeof 'object'.`, obj);
  }
  return Object.keys(obj);
};

export const toValues = (obj) => {
  if (typeof obj !== "object") {
    console.warn(`The parameter is not a typeof 'object'.`, obj);
  }
  return Object.values(obj);
};

export const toEntries = (obj) => {
  if (typeof obj !== "object") {
    console.warn(`The parameter is not a typeof 'object'.`, obj);
  }
  return Object.entries(obj);
};
