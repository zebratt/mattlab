export const qiankun = Promise.resolve({
  apps: [
    {
      name: 'slave-app', // 唯一 id
      entry: '//localhost:8002', // html entry
    },
  ],
}).then(({ apps }) => {
  return Promise.resolve({
    apps,
    routes: [{ path: '/slave', microApp: 'slave-app' }],
    sandbox: {
      strictStyleIsolation: true,
    },
    // fetch: async (url: any, ...args: any) => {
    //   if (url.indexOf('localhost:8013')) {
    //     return window.fetch(url, {
    //       ...args,
    //       headers: {
    //         Accept:
    //           'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    //       },
    //     });
    //   }
    //   return window.fetch(url, ...args);
    // },
  });
});
