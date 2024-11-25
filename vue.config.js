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
});
