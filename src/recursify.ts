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

let a = x => x = x + 1;
let b = x => x > 10000;

const test1 = () => {
  console.time('1');
  recursify(0, a, b);
  console.timeEnd('1')
}

const test2 = () => {
  console.time('2');
  const closure = (x = 0) => {
    if (x > 10000) return console.log(x);
    return closure(x + 1);
  }
  closure();
  console.timeEnd('2')
}

const test3 = () => {
  console.time('3');
  for (let i = 0; i < 10002; i++) {
    if (i === 10001) console.log(i)
  }
  console.timeEnd('3')
}

test1();
test2();
test3();
