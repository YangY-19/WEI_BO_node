/**
 * @description utils controller
 * @author YangY
*/
const path = require('path')
const fs = require('fs')
const { devDomainName } = require('../utils/env')
const MIX_SIZE = 1024 * 1024 * 1024

async function saveFile( thumbUrl, name ,size, catalogue) {
    if (parseInt(size) < MIX_SIZE) {
        let base64Data = thumbUrl.replace(/^data:image\/\w+;base64,/, '')
        let dataBuffer = new Buffer.from(base64Data, 'base64')
        const imgName = `${Date.now()}.${name}`
        let imgpath = path.resolve('./src/public/images/')
        //图片地址
        let filePath = `${imgpath}/${catalogue}/${imgName}`
        let upload = await new Promise(reslove => {
          fs.writeFile(filePath, dataBuffer, err => {
            if (err) {
              throw err
            }
            reslove(true)
            console.log('上传成功')
          })
       }) 
       if (upload) {
           return `${devDomainName}/images/${catalogue}/${imgName}`
       }
      }
    }

    async function paths (item)  {
      const { thumbUrl, name, size} = item
      let itemPath = await saveFile({ thumbUrl, name, size, catalogue})
      return itemPath
  }

module.exports = {
    saveFile,
    paths
}