
export const toast = (title, icon, image, duration) => {
  uni.showToast({
    title,
    duration: duration || 2000,
    icon,
    image
  })
}

/**
 * 根据长度会自动切换模式，优先保障显示所有文字
 * @param title
 * @param icon
 * @param duration
 */
export const error = (title, icon, duration) => {
  if (!title) return
  if (title.length > 6) {
    // 显示所有的问题
    toast(title, 'none', '', duration)
  } else {
    toast(title, 'none', '/static/icon_http_error.png', duration)
  }
}

export const modal = function () {
  const opt = {
    title: '提示',
    content: ''
  }
  if (typeof arguments[0] === 'string') {
    opt.content = arguments[0]
  } else if (typeof arguments[0] === 'object') {
    Object.assign(opt, arguments[0])
  }
  uni.showModal(opt)
}

export const back = () => uni.navigateBack()

export const linkTo = (url, type = 'default') => {
  if (type === 'default') {
    uni.navigateTo({
      url,
      fail (err) {
        console.log(err)
        uni.switchTab({
          url,
          fail (e) { modal(e.errMsg) }
        })
      }
    })
  }
}

export const showLoading = (title = 'loading', mask = true) => {
  uni.showLoading({
    title,
    mask
  })
}
export const hideLoading = () => {
  uni.hideLoading()
}
