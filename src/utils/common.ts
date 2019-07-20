export const sleep = (ms = 500) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const byDateSort = (a: any, b: any) => {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
};

export const randomFromArr = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const range = (num: number) => [...Array(num).keys()];

export const randomNumBetween = (min: number, max: number) =>
  Math.floor(Math.random() * max) + min;

export const truncate = (str: string, len: number) => {
  if (str.length > len) return `${str.substring(0, len - 3)}...`;
  return str;
};

export const noop = (...arg: any[]) => {};