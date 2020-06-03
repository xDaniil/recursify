const compose = (value: any, recursed: (val: typeof value) => typeof value, endCondition: (val: typeof value) => boolean) => {
  if (endCondition(value)) return console.log(value);
  return () => compose(recursed(value), recursed, endCondition);
}

const recursing = compose => (...args) => {
  let result = compose(...args)
  while  (typeof result === 'function') {
    result = result();
  }
  return result;
}

let recursify = recursing(compose);

export default recursify;
