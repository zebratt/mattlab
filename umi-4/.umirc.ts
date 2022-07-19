export default {
  npmClient: 'yarn',
  plugins: [
    '@umijs/plugins/dist/qiankun'
  ],
  svgo: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
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
};
