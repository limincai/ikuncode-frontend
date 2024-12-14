// monaco 代码编辑器
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const { defineConfig } = require("@vue/cli-service");
const { resolve } = require("node:path");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"), // 确保 @ 指向 src 目录
      },
    },
  },
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
  devServer: {
    client: {
      overlay: false, // 禁用错误覆盖层
    },
  },
});
