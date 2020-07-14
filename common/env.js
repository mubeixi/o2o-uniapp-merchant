
const isCustom = false
const isDev = process.env.NODE_ENV !== 'production'
const users_id = 'wkbq6nc2kc'
// Im相关配置
const IM_WSS_URL = 'wss://newjdtravel.bafangka.com/cus/'
const IM_API_URL = 'https://chat.bafangka.com'


// 测试appid   wxfe5d2621576cf895  域名 https://newo2o.bafangka.com
// 正式appid   wx28e6e80223bd5f0f  域名 https://newo2o.netcnnet.net



const confByDev = {
  apiBaseUrl: 'https://newo2o.bafangka.com',
  staticUrl: 'https://newo2o.bafangka.com',
  IM_WSS_URL,
  IM_API_URL,
  users_id,
  isCustom,
  isDev
}
const confByPro={
  apiBaseUrl: 'https://newo2o.netcnnet.net',
  staticUrl: 'https://newo2o.netcnnet.net',
  IM_WSS_URL,
  IM_API_URL,
  users_id,
  isCustom,
  isDev
}

export default confByDev

// export default confByPro
