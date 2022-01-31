// 注意 在一个函数里，改变传入的对象本身的做法是不好的

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