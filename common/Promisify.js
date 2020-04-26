/**
 * promise化接口
 */
const Promisify = (functionName, params) => {
  return new Promise((resolve, reject) => {
    uni[functionName]({
      ...params,
      success: res => resolve(res),
      fail: res => reject(res)
    })
  })
}

export default Promisify
