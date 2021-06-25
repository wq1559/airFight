## package

## 新增package

执行`npm run package:new {package_name}`整体生成新的package（包含组件的目录及测试）；该项目的`package_name`为驼峰规则

## 关于测试

### 端到端测试

执行`npm run test-pre`建立测试文件；如果带有`,`分隔的package名称，将只生成对应package的测试文件
测试文件生成在src/test；同时自动use相应package，在router中添加对应路由，在首页中添加跳转链接
组件开发人员在测试文件中添加测试代码
执行`npm run test`启动项目，观察组件效果