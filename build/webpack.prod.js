const { dirname } = require('path');
let path = require('path');

module.exports = { 
    mode: 'production',
    path: path.resolve(__dirname, '../public'),
    publicPath: '',   // 如果需要使用cdn的时候再配置
    modules: {
        
    },
    plugins: {

    }
}