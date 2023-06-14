export const unwrapFn = (fn, ...args) =>
  typeof fn === "function" ? fn(...args) : fn;
