const { configure } = require("quasar/wrappers");

module.exports = configure(function () {
  return {
    eslint: {
      warnings: true,
      errors: true,
    },

    boot: ["axios"],

    css: ["app.css"],

    extras: ["roboto-font", "material-icons"],

    build: {
      target: {
        browser: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
        node: "node16",
      },

      env: {
        API: "http://localhost:3000/api",
      },

      vueRouterMode: "hash",
    },

    devServer: {},

    framework: {
      config: {},

      plugins: [
        "Screen",
        "Loading",
        "Notify",
        "AddressbarColor",
        "LoadingBar",
        "AppFullscreen",
        "Meta",
        "Cookies",
        "Dialog",
        "BottomSheet",
        "LocalStorage",
        "SessionStorage",
      ],
    },

    animations: [],

    ssr: {
      pwa: false,

      prodPort: 3000,

      middlewares: ["render"],
    },

    pwa: {
      workboxMode: "generateSW",
      injectPwaMetaTags: true,
      swFilename: "sw.js",
      manifestFilename: "manifest.json",
      useCredentialsForManifestTag: false,
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      inspectPort: 5858,

      bundler: "packager",

      packager: {},

      builder: {
        appId: "front-end",
      },
    },

    bex: {
      contentScripts: ["my-content-script"],
    },
  };
});
