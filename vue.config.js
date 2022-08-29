const { defineConfig } = require('@vue/cli-service')
const path = require('path')
// 拼接主题的绝对路径
const themPath = path.join(__dirname, './src/styles/theme.less')
module.exports = defineConfig({
  // babel node_modules 进行转义，安全性， 缺点： 耗时
  transpileDependencies: true,

  // 关闭eslint， build serve将不会进行eslint检查
  // lintOnSave: false,
  // 书写原生的webpack配置项
  configureWebpack: {
    devServer: {
      open: true,
      port: 8080,
      host: 'localhost'
    },
    resolve: {
      alias: {
        '#': path.join(__dirname, 'src/components')
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 此处修改样式
            // 直接覆盖变量或者通过 less 文件覆盖
            // 这里采用less文件覆盖
            hack: `true; @import "${themPath}";`
          }
        }
      }
    }
  }
})
