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

export default map;
