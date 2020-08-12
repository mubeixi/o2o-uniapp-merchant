const { readFileByPromise, writeFileByPromise } = require('./utils')

const confTmplFilePath = './src/common/env.pro'
const confFilePath = './src/common/env.js'

const wxMpAppid = 'wx28e6e80223bd5f0f'
const wxMpAppidPlaceholar = '%mpWeixinAppid%' // 占位
const manifestTmplFilePath = './src/manifest.json.tmpl'
const manifestFilePath = './src/manifest.json'

// 修改业务配置文件
async function changeEnvFile () {
  const confContent = await readFileByPromise(confTmplFilePath)
  return await writeFileByPromise(confFilePath, confContent)
}

// 修改manifest.json配置文件
async function changeManifestConf () {
  var confContent = await readFileByPromise(manifestTmplFilePath)
  confContent = confContent.replace(wxMpAppidPlaceholar, wxMpAppid)
  return await writeFileByPromise(manifestFilePath, confContent)
}

/**
 * 火箭发射
 * @returns {Promise<void>}
 */
async function fly () {
  await changeEnvFile()
  await changeManifestConf()
}

fly()
