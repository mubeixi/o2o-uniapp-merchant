import { toast, modal } from '@/common/fun'

/**
 * 异常类——构造函数模式
 */
export function Exception () {

}

/**
 * 异常类——es6模式
 */
// export class Exception {
//   constructor () {
//   }
//
//   handle
// }

/**
 * 自定义处理错误
 * @param msg
 * @constructor
 */
function handle (e) {
  let { message = '错误信息', type = 'toast', icon = 'none' } = e
  if (typeof e !== 'object') {
    message = e
  }
  if (type === 'toast') toast(message, icon)
  if (type === 'modal') modal(message)
  return ({
    message,
    type,
    icon
  })
}

Exception.prototype = {
  constructor: Exception
}
Exception.handle = handle
