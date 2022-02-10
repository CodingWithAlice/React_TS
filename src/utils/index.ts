// 注意 在一个函数里，改变传入的对象本身的做法是不好的

import { useEffect, useState } from "react";

/**
 * 
 */
export const isFalsy = (value: unknown) => value === 0 ? false : !value;

/**
 * 删除对象中值为空的项
 */
export const cleanObject = (object: object) => {
  // 等价于 Object.assign({}, object)
  const result = {...object};
  Object.keys(result).forEach(key => {
    // 这里涉及到泛型的概念，暂时略过
    // @ts-ignore
    const value = result[key];
    if(isFalsy(value)) {
      // @ts-ignore
      delete result[key]
    }
  })
  return result
}

/**
 * 写一个页面中只执行一次的 custom hook
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

/**
 * 写一个防抖 hook debounce
 */
//  后面用泛型来规范类型
export const useDebounce = ((value: unknown, delay?: number): any => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout  = setTimeout(() => setDebounceValue(value), delay);
    // 重点：每次在上一个 useEffect 处理完后再运行
    return () => clearTimeout(timeout);
  },[value, delay]);

  return debounceValue;
})