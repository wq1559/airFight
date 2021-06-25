const _exec = require('child_process').exec;
const util = require('util')

const exec = util.promisify(_exec)

var packageNames
let nameArg = process.argv[2]
if (nameArg) {
  packageNames = process.argv[2].split(',').map(e => e.trim())
}
if (!packageNames || !packageNames.length) {
  console.error('[package:add] no packageName specified!')
  return
}

exec(`node build/package/package-add.js ${nameArg}`)
  .then((res1) => exec(`node build/test/test-pre.js ${nameArg}`).then((res2) => {
    if (res1.stderr || res2.stderr) {
      console.log(res1.stderr)
      console.log(res2.stderr)
      console.log('###########################################')
    }
    console.log(res1.stdout)
    console.log(res2.stdout)
  }))
