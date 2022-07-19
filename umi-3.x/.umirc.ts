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
});
