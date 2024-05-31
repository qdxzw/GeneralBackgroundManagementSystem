const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = express('cors')
const loginRouter = require('./router/login')
const jwtconfig = require('./jwt_config/index')
const { expressjwt: jwt } = require('express-jwt')
const Joi = require('joi')
const port = 3000
app.use(cors)
// parse application/x-www-form-urlencodedn
// 当extended为false时，值为数组或者字符串，当为true时，值为任意类型
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use((req, res, next) => {
  // status=0为成功，=1为失败，默认设为1，方便处理失败的情况
  res.cc = (err, status = 1) => {
    res.send({
      status,
      // 判断这个error是错误对象还是字符串
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})
app.use('/api', loginRouter)
app.use(
  jwt({
    secret: jwtconfig.jwtSecretKey,
    algorithms: ['HS256']
  }).unless({
    path: [/^\/api\//]
  })
)
app.use((req, res, next) => {
  if (err instanceof Joi.ValidationError) return res.cc(err)
})
app.listen(port, () => {
  console.log(`localhost:${port}`)
})
