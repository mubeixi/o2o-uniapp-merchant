// 实行文件操作
// 文件写入
// 1.加载文件操作，fs模块
var fs = require('fs')
var msg = ''
// 2.调用fs.readFile(file[,options],callback)file是文件文件名，options是编码如utf8,callback是回调函数
fs.readFile('./common/env.dev', function (err, data) {
  if (err) {
    console.log('err')
  }
  // data参数的数据类型是Buffer对象，里面保存的是一个个字节（理解为字节组）
  console.log('data:', data)
  // 把Buffer对象转换为字符串，调用toString(utf8)方法
  console.log('data.toString(\'utf8\'):', data.toString('utf8'))
  // toString()里可以不加utf8
  console.log('data.toString():', data.toString())

  msg = data.toString()

  // 调用fs.writeFile() 进行文件写入
  fs.writeFile('./common/env.js', msg, 'utf8', function (err) {
    // 如果err=null，表示文件使用成功，否则，表示希尔文件失败
    if (err) {
      console.log('写文件出错了，错误是：' + err)
    } else {
      console.log('ok')
    }
  })
})
