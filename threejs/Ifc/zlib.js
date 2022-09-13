const zlib = require('zlib')
const fs = require('fs')
const html = fs.readFileSync('rac_basic_sample_project.ifc')
var a= zlib.gzipSync(html)

const writer = fs.createWriteStream('rac_basic_sample_project.zifc', {flags: 'w'})
//写入数据到流
writer.write(a)
console.log(a);