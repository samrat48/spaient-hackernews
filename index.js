require('@babel/register')({
    ignore: [ /(node_modules)/ ],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [ ["transform-import-css", {
      "generateScopedName": "lib-[name]-[local]-[hash:base64:4]"
    }], "@babel/plugin-transform-arrow-functions", "@babel/plugin-proposal-class-properties" ]
});

require('./server');