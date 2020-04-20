import { fetch } from '@/common/request'
import Storage from '@/common/Storage'
export const getSmsCode = (param, options) => fetch({ act: 'login_sms', param, options })

export const userLogin = (data, options) => {
  // 获取推荐人id
  let owner_id = Storage.get('owner_id')
  if (!owner_id) {
    owner_id = 0
  }
  const param = { ...data, owner_id }
  return fetch({ act: 'user_login', param, options })
}
