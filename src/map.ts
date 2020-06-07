import recursify from "./recursify"

const arrayCall = (index, callback) => (arr) => {
  let { increment, value } = index;
  let copy = arr;
  let elem = callback(arr[value()])
  copy[value()] = elem;
  if (value() < arr.length) increment();
  return copy;
}

const indexClosure = () => {
  let index = 0;
  const increment = () => index = index + 1;
  return {
    increment: () => increment(),
    value: () => index
  }
}

const endCondition = (index) => (arr) => {
  let bool = index.value() === arr.length;
  if (bool) console.timeEnd();
  return bool
};
console.time()
const map = (arr, callback) => {
  const index = indexClosure();
  return recursify(arr, arrayCall(index, callback), endCondition(index))
}

const foo = x => x * 3

map([1,2,3,4,5,6,7,8,9,0,-2], foo)

const a = () => {
  console.time();
  let b = [1,2,3,4,5,6,7,8,9,0,-2]
  b.map(el => el * 3);
  console.timeEnd()
}

a()
