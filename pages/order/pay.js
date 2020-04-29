import { objTranslate } from '@/common/helper'

// 格式化参数
export const farmatPayParam = (postData) => {
  const {
    need_invoice,
    invoice_info,
    use_money,
    order_remark
  } = objTranslate(postData)

  return {
    need_invoice: JSON.stringify(need_invoice),
    invoice_info: JSON.stringify(invoice_info),
    use_money: JSON.stringify(use_money),
    order_remark: JSON.stringify(order_remark)
  }
}
