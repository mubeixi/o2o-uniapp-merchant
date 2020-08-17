import { getArrColumn, objTranslate } from '@/common/helper'

// 格式化参数
export const farmatPayParam = (postData) => {
  const {
    need_invoice,
    invoice_info,
    use_money,
    order_remark,
  } = objTranslate(postData)
  
  return {
    need_invoice: JSON.stringify(need_invoice),
    invoice_info: JSON.stringify(invoice_info),
    use_money: JSON.stringify(use_money),
    order_remark: JSON.stringify(order_remark),
  }
}

function sumArr (arr) {
  if (!Array.isArray(arr)) throw Error('需要是数组')
  let count = 0
  for (let num of arr) {
    if (isNaN(num)) throw Error('数组中元素必须为数字或者数字字符串')
    if (typeof num === 'string') num = parseFloat(num)
    count += num
  }
  return count
}

export const computeArrayColumnSum = (arr, key) => {
  const nums = getArrColumn(arr, key)
  return sumArr(nums)
}
