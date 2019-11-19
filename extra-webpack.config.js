module.exports = {
  module: {
    rules: [{
      test: /\.less$/,
      loader: 'less-loader',
      options: {
        modifyVars: { // modify theme variable
          'primary-color': '#FF5722',
          'link-color': '#FF5722',
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }]
  }
};
