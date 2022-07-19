export default {
  npmClient: 'yarn',
  svgr: {
    svgProps: { viewBox: '0 0 1024 1024' },
  },
  plugins: [
    '@umijs/plugins/dist/qiankun'
  ],
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
