module.exports = (api) => {
  api.cache(false);

  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          bugfixes: true,
          useBuiltIns: 'usage',
          shippedProposals: true,
          corejs: '3.8',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      'babel-plugin-lodash',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-class-properties',
      [
        'import',
        {
          libraryName: 'antd',
          style: true,
        },
        'antd',
      ],
      [
        'import',
        {
          libraryName: '@ant-design/icons',
          libraryDirectory: 'lib/icons',
          camel2DashComponentName: false,
        },
        '@ant-design/icons',
      ],
    ],
  };
};
