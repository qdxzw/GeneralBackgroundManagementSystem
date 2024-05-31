const db = require('../db/db')
const bcrypt = require('bcryptjs')
// 导入jwt，用于生成token
const jwt = require('jsonwebtoken')
// 导入jwt配置文件，用于加密跟解密
const jwtconfig = require('../jwt_config/index')
exports.register = (req, res) => {
  // 1. 获取前端传递的数据
  const registerInfo = req.body

  // 2. 判断传递的数据是否为空
  if (!registerInfo.account || !registerInfo.password) {
    return res.send({
      status: 1,
      message: '账号或者密码为空'
    })
  }

  // 3. 判断账号是否存在
  const sql = 'SELECT * FROM user WHERE account = ?'
  db.query(sql, [registerInfo.account], (err, result) => {
    if (err) {
      return res.send({
        status: 1,
        message: '数据库查询出错'
      })
    }

    if (result.length > 0) {
      return res.send({
        status: 1,
        message: '账号已存在'
      })
    }

    // 4. 对密码进行加密（使用中间件 bcrypt）
    registerInfo.password = bcrypt.hashSync(registerInfo.password, 10) // 通常 bcrypt 的加密强度为 10

    // 5. 将数据存储到数据表
    const sql1 = 'INSERT INTO user SET ?'
    const identity = '用户'
    const create_time = new Date()
    db.query(
      sql1,
      {
        account: registerInfo.account,
        password: registerInfo.password,
        identity,
        create_time,
        status: 0 // 初始未冻结状态为 0
      },
      (err, results) => {
        if (err) {
          return res.send({
            status: 1,
            message: '注册账号失败'
          })
        }
        if (!results || !results.affectedRows) {
          return res.send({
            status: 1,
            message: '注册账号失败'
          })
        }

        res.send({
          status: 0,
          message: '注册账号成功'
        })
      }
    )
  })
}
exports.login = (req, res) => {
  const loginInfo = req.body
  // 第一步检查数据库中有没有
  const sql = 'select * from user where account=?'
  db.query(sql, loginInfo.account, (err, reslut) => {
    // 执行sql语句失败的情况，一般在数据库断开的情况下会执行失败
    if (err) return res.cc(err)
    // 如果没查询到数据，登录失败
    if (reslut.length !== 1) {
      return res.cc('登录失败')
    }
    // 第二步解密密码
    const compareResult = bcrypt.compareSync(
      loginInfo.password,
      reslut[0].password
    )
    if (!compareResult) {
      return res.cc('登录失败')
    }
    // 第三步判断账号是否被冻结
    if (loginInfo.status == 1) {
      return res.cc('账号被冻结')
    }
    // 第四步返回一个token给前端(剔除加密后的密码,头像,创建时间,更新时间)
    const user = {
      ...reslut[0],
      password: '',
      imageUrl: '',
      create_time: '',
      update_time: ''
    }
    // 设置token有效值
    const tokenStr = jwt.sign(user, jwtconfig.jwtSecretKey, {
      expiresIn: '7h'
    })
    res.send({
      reslut: reslut[0],
      status: 0,
      message: '登陆成功',
      token: 'Bearer ' + tokenStr
    })
  })
}
