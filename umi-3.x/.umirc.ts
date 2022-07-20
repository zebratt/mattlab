const { ModuleFederationPlugin } = require('webpack').container;

import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      path: '/sub',
      component: '@/pages/SubPage/index',
    },
    {
      path: '/slave/*',
      microApp: 'slave-app',
    },
  ],
  fastRefresh: {},
  qiankun: {
    master: {},
  },
  mfsu: false,
  webpack5: {},
  chainWebpack(memo) {
    memo.output.publicPath('auto');
    memo.plugin('mf').use(ModuleFederationPlugin, [
      {
        name: 'mf1',
        library: { type: 'umd', name: 'mf1' },
        filename: 'remoteEntry.js',
        exposes: {
          './Button': './src/components/Button',
        },
        shared: { react: { eager: true }, 'react-dom': { eager: true } },
      },
    ]);
  },
});
