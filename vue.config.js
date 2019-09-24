const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../whatistheoutput-be/public'),
  devServer: {
    proxy: {
      '/questions': {
        target: 'http://localhost:3000'
      }
    }
  }
}