const recursing = (initialValue: any, recursed: (val: typeof initialValue) => typeof initialValue, endCondition) => { 
  console.time()
  if (endCondition(initialValue)) return console.log(initialValue);
  return () => recursing(recursed(initialValue), recursed, endCondition);
}

const compose = (recursing: Function) => (initialValue: any, recursed: (val: typeof initialValue) => typeof initialValue, endCondition) => {
  let result = <Function>recursing(initialValue, recursed, endCondition);
  while  (typeof result === 'function') {
    result = result();
  }
  return result;
}

let recursify = compose(recursing);

export default recursify;
