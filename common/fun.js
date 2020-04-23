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

export function backFunc () {
  uni.navigateBack()
}

export const linkToEasy = (url, type = 'default') => {
  if (type === 'default') {
    uni.navigateTo({
      url,
      fail (err) {
        console.log(err)
        uni.switchTab({
          url,
          fail (e) {
            modal(e.errMsg)
          }
        })
      }
    })
  }
}

export const linkTo = (linkObj) => {
  console.log(linkObj)
  let { link, linkType, ext = {} } = linkObj
  if (!link) {
    // error('跳转地址为空')
    return
  }

  // 跳转到小程序
  if (linkType === 'mini') {
    const { url, appid, origin_id } = ext

    // #ifdef APP-PLUS
    if (!origin_id) {
      error('origin_id_缺失')
      return
    }
    plus.share.getServices(function (s) {
      var shares = null
      var sweixin = null

      shares = {}
      for (var i in s) {
        var t = s[i]
        shares[t.id] = t
      }
      sweixin = shares.weixin

      sweixin ? sweixin.launchMiniProgram({
        id: origin_id,
        path: link,
        webUrl: ext.url
      }) : toast('跳转小程序参数错误')
    }, function (e) {
      if (ext.url) {

      }
    })
    return
    // #endif

    // #ifdef MP
    if (appid && link) {
      uni.navigateToMiniProgram({
        appId: appid,
        path: link,
        success (res) {
          console.log(res)
          // 打开成功
        },
        fail (err) {
          const { errMsg = '请联系客服' } = err
          uni.showModal({
            title: '跳转小程序错误',
            content: errMsg
          })
          console.log(err)
        }
      })
      return
    } else {
      error('小程序跳转参数错误')
    }
    return
    // #endif

    // #ifdef H5
    if (url) {
      location.href = ext.url
    } else {
      error('小程序备用地址为空')
    }
    return

    // #endif

    return
  }

  // 第三方链接
  if (linkType === 'third' || link.indexOf('http') !== -1) {
    // #ifndef H5

    uni.navigateTo({
      url: '/pages/common/webview?encode=1&url=' + encodeURIComponent(link)
    })
    // #endif

    // #ifdef H5
    location.href = link
    // #endif

    return
  }

  if (link[0] !== '/') {
    link = '/' + link
  }

  uni.navigateTo({
    url: link
  })
  // 除了这些页面之外，其他都走普通跳转
  // if (isHasTabbarRouter(link)) {
  //   uni.switchTab({
  //     url: link
  //   })
  // } else {
  //   uni.navigateTo({
  //     url: link
  //   })
  // }
}

export const confirm = (options) => {
  return new Promise(function (resolve, reject) {
    uni.showModal({
      ...options,
      success: function (res) {
        if (res.confirm) {
          resolve(res)
        } else if (res.cancel) {
          reject(res)
        }
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
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
