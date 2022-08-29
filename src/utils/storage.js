/**
 * 封装本地存储操作模块
 */

/**
 * 存储数据
 */
export const setItem = (key, value) => {
  // 判断数据类型
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * @param
 * {}
 * 这里采用try catch 不是为了装逼，而是这样可以检测出data数据是不是json格式的，
 * 而不用去写一些复杂的正则去判断
 */

export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/**
 * 删除数据
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
