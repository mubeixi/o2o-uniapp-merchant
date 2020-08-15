// 局部模式
const shell = require('shelljs')
const {resolve} = require('path')
const rootDirPath = resolve('./')
const projectRuntimePath = `${rootDirPath}/dist/dev/mp-weixin`

// 打开微信开发者工具
shell.exec(`cli open --project ${projectRuntimePath}`)



if (shell.exec('npm run trans:dev').code !== 0) { // 执行npm run build 命令
  shell.echo('Error: clean failed')
  shell.exit(1)
}

if (shell.exec('npm run dev:mp-weixin').code !== 0) { // 执行npm run build 命令
  shell.echo('Error: run failed')
  shell.exit(1)
}
