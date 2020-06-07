import recursify from "./recursify";
import { Index, Callback } from "./interfaces/map-interface"

const arrayCall = (index: Index, callback: Callback) => (arr: any[]) => {
  let { increment, value } = index;
  let copy = arr;
  let elem = callback(arr[value()]);
  copy[value()] = elem;
  if (value() < arr.length) increment();
  return copy;
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

const map = (arr: any[], callback: Callback) => {
  const index = indexClosure();
  return recursify(arr, arrayCall(index, callback), endCondition(index));
}

export default map;
