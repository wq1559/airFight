// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    indent: ["error", 2, { "ArrayExpression": 1, "ObjectExpression": 1 }],
    'eol-last': 0, // 文件以单一的换行符结束
    'semi': [0, 'always'], //语句强制分号结尾
    'comma-dangle': [0, 'always'],
    'space-before-function-paren': [0, 'always'], //函数定义时括号前面要不要有空格
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  globals: {
    'Mock': true
  }
}