const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config.js')

require('dotenv').config({ path: './config/local.env' })

const port = process.env.PORT
const app = express()

const compiler = webpack(config)
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
})

app.use('/', express.static(path.join(__dirname, '/static')))
app.use(middleware)
app.use(webpackHotMiddleware(compiler))
app.get('*', function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
  res.end()
})

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err)
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port)
  opn(`http://localhost:${port}`)
    .catch(err => {
      console.log(`can't open in your pc`)
    })
})
