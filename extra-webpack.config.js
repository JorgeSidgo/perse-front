module.exports = {
  module: {
    rules: [{
      test: /\.less$/,
      loader: 'less-loader',
      options: {
        modifyVars: { // modify theme variable
          'primary-color': '#db5127',
          'link-color': '#db5127',
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }]
  }
};
