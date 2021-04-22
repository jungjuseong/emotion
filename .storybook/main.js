const path = require("path");

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const resolvePath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: [
    "../src/**/*.stories.mdx", 
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links", 
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async (config) => {
    // typescript 설정
    config.resolve.plugins.push(new TsconfigPathsPlugin({}));

    // @storybook/addon-docs 의 emotion 10 과의 충돌을 해결
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "@emotion/core": resolvePath("node_modules/@emotion/react"),
        "@emotion/styled": resolvePath("node_modules/@emotion/styled"),
        "emotion-theming": resolvePath("node_modules/@emotion/react"),
      },
    };

    // storybook 에 emotion 관련 babel 설정추가
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [
          require.resolve("@emotion/babel-preset-css-prop"),
        ],
        plugins: [
          [
            require.resolve('babel-plugin-named-asset-import'),
            {
              loaderMap: {
                svg: {
                  ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]'
                }
              }
            }
          ]
        ],
      },
    });

    // Sass
    config.module.rules.push(
      {
        test: /\.(s*)css$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader?modules", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ],
        include: path.resolve(__dirname, "../styles/global.scss"),
        exclude: /node_modules/
      }
    );
    return config;
  },
};