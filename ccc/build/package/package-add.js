const util = require('util')
const fs = require('fs');
const path = require('path')
const ejs = require('ejs')

const mkdir = util.promisify(fs.mkdir)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

var packageNames
if (process.argv[2]) {
  packageNames = process.argv[2].split(',').map(e => e.trim())
}
if (!packageNames || !packageNames.length) {
  console.error('[package:add] no packageName specified!')
  return
}

const PACKAGE_DIR = path.resolve(__dirname, '../../packages')
const PACKAGE_INDEX_FILE = path.resolve(__dirname, '../../packages/index.js')
const PACKAGE_INDEX_IMPORT_POS = `// new_package`
const PACKAGE_INDEX_COMPONENT_POS = `  // new_package_component`
const PACKAGE_INDEX_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './package-index-template.ejs'), 'utf-8')
const PACKAGE_MAIN_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './package-main-template.ejs'), 'utf-8')

const toCapital = str => {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
};

function genPackage(packageName) {
  let dir = path.resolve(PACKAGE_DIR, packageName)
  let srcDir = path.resolve(dir, 'src')

  if (!fs.existsSync(dir)) {
    return mkdir(dir).then(() => {
      return mkdir(srcDir)
    }).then(() => {
      return genPackageFile({
        dir,
        packageName
      })
    }).then(() => {
      return genPackageMainFile({
        dir: srcDir,
        packageName
      })
    })
  } else {
    console.warn('[package:add] package dir exist:', packageName)
    return
  }
}

function genPackageFile({
  dir,
  packageName
}) {
  let filepath = dir + path.sep + 'index.js'
  let fileStr = ejs.render(PACKAGE_INDEX_TEMPLATE, {
    name: toCapital(packageName)
  })

  return writeFile(filepath, fileStr).then(() => {
    return packageName
  })
}

function genPackageMainFile({
  dir,
  packageName
}) {
  let pwcComponentName = 'Pwc' + toCapital(packageName)
  let filepath = dir + path.sep + 'main.vue'
  let fileStr = ejs.render(PACKAGE_MAIN_TEMPLATE, {
    componentName: pwcComponentName
  })

  return writeFile(filepath, fileStr).then(() => {
    return packageName
  })
}

function insertPackageIndex(names) {
  names = names.filter(e => e)
  if (!names || !names.length) {
    return names
  }

  let importList = []
  let componentList = []

  names.map((name) => {
    let pwcComponentName = 'Pwc' + toCapital(name)
    importList.push(`import ${pwcComponentName} from '../packages/${name}/index.js'`)
    componentList.push(`  ${pwcComponentName},`)
  })

  return readFile(PACKAGE_INDEX_FILE, 'utf-8').then(fileStr => {
    fileStr = fileStr.replace(PACKAGE_INDEX_IMPORT_POS, importList.join('\n') + '\n' + PACKAGE_INDEX_IMPORT_POS)
    fileStr = fileStr.replace(PACKAGE_INDEX_COMPONENT_POS, componentList.join('\n') + '\n' + PACKAGE_INDEX_COMPONENT_POS)

    return writeFile(PACKAGE_INDEX_FILE, fileStr)
  }).then(() => {
    return names
  })
}

function report(succNames, allNames) {
  let existNames = allNames.filter(e => !succNames.includes(e))
  console.log(`成功生成文件的packages: ${succNames.join(', ')}`)
  console.log(`已经存在文件的packages: ${existNames.join(', ')}`)
}

function main() {
  Promise.all(packageNames.map(genPackage))
    .then(insertPackageIndex)
    .then((succNames) => {
      report(succNames, packageNames)
    }).catch(e => {
      throw e
    })
}

main()
