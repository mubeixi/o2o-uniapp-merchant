import storage from '@/common/storage'

const T = {}
T.locale = null
T.locales = {}

T.registerLocale = function (locales) {
  T.locales = locales
}
// 设置语言
T.setLocale = function (code) {
  const _code = code || storage.get('language') || 'zh-cn'
  T.locale = _code
  storage.set('language', _code)
}

T._ = function (line, data) {
  const locale = T.locale
  const locales = T.locales
  if (locale && locales[locale] && locales[locale][line]) {
    line = locales[locale][line]
  }
  return line
}

export default T
