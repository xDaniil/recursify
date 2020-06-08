import recursify from "./recursify";
import { Index, Callback } from "./interfaces/map-interface"

const arrayCall = (index: Index, callback: Callback) => (arr: Promise<any>[]) => {
  let { increment, value } = index;
  console.log(value())
  arr[value()].then((elem) => {
    callback(elem)
  }).then((elem) => {
    arr[value()] = Promise.resolve(elem) 
  }).then(() => {
    if (value() < arr.length) increment();
  });
  return arr;
}

const indexClosure = (): Index => {
  let index: number = 0;
  const increment = (): number => index = index + 1;
  return {
    increment: () => increment(),
    value: () => index
  }
}

const endCondition = (index: Index) => (arr: any[]) => index.value() === arr.length;

const asyncMap = (arr: any[], callback: Callback) => {
  const index = indexClosure();
  return recursify(arr, arrayCall(index, callback), endCondition(index));
}

export default asyncMap;
