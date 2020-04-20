const Storage = {
  set (key, val, cover) {
    try {
      if (!cover && !val && (val !== 0 || val !== false)) return false
      return uni.setStorageSync(key, val)
    } catch (e) {
      uni.showModal(`设置Storage失败，key：${key}`)
    }
  },

  get (key) {
    try {
      var val = uni.getStorageSync(key)
      return val
    } catch (e) {
      // error
      uni.showModal(`获取Storage失败，key：${key}`)
    }
  },
  remove (key) {
    return uni.removeStorageSync(key)
  },
  clear () {
    return uni.clearStorageSync()
  }
}

export default Storage
