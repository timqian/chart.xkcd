
const isEmptyArray = (data) => {
  if (!data) {
    return true;
  }

  return !(Array.isArray(data) && data.length);
};

export default { isEmptyArray };
