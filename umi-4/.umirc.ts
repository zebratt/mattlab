const { ModuleFederationPlugin } = require("webpack").container;

export default {
  npmClient: 'yarn',
  plugins: [
    '@umijs/plugins/dist/qiankun'
  ],
  svgo: {
    plugins: [
      {
        name: 'removeViewBox',
        active: false,
      },
    ],
  },
  qiankun: {
    master: {
      apps: [
        {
          name: 'slave-app',
          entry: '//localhost:8002',
        },
      ],
    },
  },
  routes: [
    {
      path: '/',
      component: 'Home',
    },
    {
      path: '/slave/*',
      microApp: 'slave-app',
    },
  ],
  mfsu: false,
  chainWebpack(memo) {
    memo
      .plugin('mf')
      .use(ModuleFederationPlugin, [{
        name: "mf2",
        remotes: {
          mf1: "mf1@//172.17.245.58:3003/remoteEntry.js"
        },
      }])
  },
};
