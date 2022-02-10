// 注意 在一个函数里，改变传入的对象本身的做法是不好的

import { useEffect, useState } from "react";

/**
 * 
 */
export const isFalsy = (value) => value === 0 ? false : !value;

/**
 * 删除对象中值为空的项
 */
export const cleanObject = (object) => {
  // 等价于 Object.assign({}, object)
  const result = {...object};
  Object.keys(result).forEach(key => {
    const value = result[key];
    if(isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

/**
 * 写一个页面中只执行一次的 custom hook
 */
export const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, [])
}

/**
 * 写一个防抖 hook debounce
 */
export const useDebounce = ((value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout  = setTimeout(() => setDebounceValue(value), delay);
    // 重点：每次在上一个 useEffect 处理完后再运行
    return () => clearTimeout(timeout);
  },[value, delay]);

  return debounceValue;
})