export const hashArray = (arr, keyProp, valueProp, extraProps = []) =>
  arr.reduce((acc, curr) => {
    acc[curr[keyProp]] = curr[valueProp];
    return acc;
  }, {});
