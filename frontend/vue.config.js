module.exports = {
  devServer: {
    open: false,
    port: 8090,
    overlay: {
      errors: true,
      warnings: true
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}