/* eslint-disable */
module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:3333/"
      }
    }
  },
  chainWebpack: (config) => {
    config
      .plugin("html")
      .tap((args) => {
        args[0].title = "Koalunch";
        return args;
      });
  }
};
