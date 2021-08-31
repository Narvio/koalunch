/* eslint-disable */
module.exports = {
  publicPath: "/public/",
  devServer: {
    proxy: {
      "^/feedback": {
        target: "http://localhost:3333/"
      },
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
  },

  pluginOptions: {
    i18n: {
      locale: 'cs',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  }
};
