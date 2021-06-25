const util = require('util')
const fs = require('fs');
const path = require('path')
const ejs = require('ejs')

const mkdir = util.promisify(fs.mkdir)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const PACKAGE_DIR = path.resolve(__dirname, '../../packages')
const TEST_APP_DIR = path.resolve(__dirname, '../../test/app')
const PACKAGE_INSTALL_FILE = path.resolve(__dirname, TEST_APP_DIR, './src/packages-install.js')
const PACKAGE_INSTALL_IMPORT_POS = `// new_package`
const PACKAGE_INSTALL_USE_POS = `  // new_package_use`
const ROUTER_FILE = path.resolve(__dirname, TEST_APP_DIR, './src/router/index.js')
const ROUTER_IMPORT_POS = `// new_test_component`
const ROUTER_ROUTER_POS = `    // new_test_route`
const INDEX_FILE = path.resolve(__dirname, TEST_APP_DIR, './src/components/HelloWorld.vue')
const INDEX_LINK_POS = `    <!-- new_router_link -->`
const TEST_VUE_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './test-vue-template.ejs'), 'utf-8')

const toCapital = str => {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
};

if (!fs.existsSync(TEST_APP_DIR)) {
  fs.mkdirSync(TEST_APP_DIR);
}

var packageNames
if (process.argv[2]) {
  packageNames = process.argv[2].split(',').map(e => e.trim())
}
const IS_FULL = !packageNames || !packageNames.length

// console.log(packageNames, TEST_APP_DIR)

const toCamelCase = str => {
  let s =
    str &&
    str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
    .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

function genTest(packageName) {
  let dir = path.resolve(TEST_APP_DIR, 'src/test', packageName)

  if (!fs.existsSync(dir)) {
    return mkdir(dir).then(() => {
      return genTestFile({
        dir,
        packageName
      })
    })
  } else {
    !IS_FULL && console.warn('[test:pre] test dir exist: ', packageName)
    return
  }
}

function genTestFile({
  dir,
  packageName
}) {
  let pwcComponentName = 'Pwc' + toCapital(packageName)
  let filepath = dir + path.sep + 'test.vue'
  let fileStr = ejs.render(TEST_VUE_TEMPLATE, {
    componentName: pwcComponentName
  })

  return writeFile(filepath, fileStr).then(() => {
    return packageName
  })
}

function insertPackageUse(names) {
  names = names.filter(e => e)
  if (!names || !names.length) {
    return names
  }

  let importList = []
  let useList = []

  names.map((name) => {
    let componentName = name
    importList.push(`import ${componentName} from '../../../packages/${name}'`)
    useList.push(`  Vue.use(${componentName}, {})`)
  })

  return readFile(PACKAGE_INSTALL_FILE, 'utf-8').then(fileStr => {
    fileStr = fileStr.replace(PACKAGE_INSTALL_IMPORT_POS, importList.join('\n') + '\n' + PACKAGE_INSTALL_IMPORT_POS)
    fileStr = fileStr.replace(PACKAGE_INSTALL_USE_POS, useList.join('\n') + '\n' + PACKAGE_INSTALL_USE_POS)

    return writeFile(PACKAGE_INSTALL_FILE, fileStr)
  }).then(() => {
    return names
  })
}

function insertTestRoutes(names) {
  names = names.filter(e => e)
  if (!names || !names.length) {
    return names
  }

  let importList = []
  let routerList = []

  names.map((name) => {
    let componentName = name + 'Test'
    importList.push(`import ${componentName} from '../test/${name}/test.vue'`)
    routerList.push(`    {
      path: '/test/${componentName}',
      name: '${componentName}',
      component: ${componentName}
    },`)
  })

  return readFile(ROUTER_FILE, 'utf-8').then(routerFileStr => {
    routerFileStr = routerFileStr.replace(ROUTER_IMPORT_POS, importList.join('\n') + '\n' + ROUTER_IMPORT_POS)
    routerFileStr = routerFileStr.replace(ROUTER_ROUTER_POS, routerList.join('\n') + '\n' + ROUTER_ROUTER_POS)

    return writeFile(ROUTER_FILE, routerFileStr)
  }).then(() => {
    return names
  })
}

function insertTestLinks(names) {
  names = names.filter(e => e)
  if (!names || !names.length) {
    return names
  }

  let linkList = []

  names.map((name) => {
    let componentName = name + 'Test'
    linkList.push(`    <router-link tag="li" to="/test/${componentName}">
      <a>/${componentName}</a>
    </router-link>`)
  })

  return readFile(INDEX_FILE, 'utf-8').then(fileStr => {
    fileStr = fileStr.replace(INDEX_LINK_POS, linkList.join('\n') + '\n' + INDEX_LINK_POS)

    return writeFile(INDEX_FILE, fileStr)
  }).then(() => {
    return names
  })
}

function getFullPackageNames() {
  let res = []
  const files = fs.readdirSync(PACKAGE_DIR)
  files.forEach(function (item, index) {
    let stat = fs.lstatSync(PACKAGE_DIR + path.sep + item)
    if (stat.isDirectory() === true) {
      res.push(item)
    }
  })

  return res
}

function report(succNames, allNames) {
  let existNames = allNames.filter(e => !succNames.includes(e))
  console.log(`成功生成测试文件的packages: ${succNames.join(', ')}`)
  console.log(`已经存在测试文件的packages: ${existNames.join(', ')}`)
}

function main() {
  let names

  if (IS_FULL) {
    names = getFullPackageNames()
  } else {
    names = packageNames
  }
  Promise.all(names.map(genTest))
    .then(insertPackageUse)
    .then(insertTestRoutes)
    .then(insertTestLinks)
    .then((succNames) => {
      report(succNames, names)
    }).catch(e => {
      throw e
    })
}

main()
