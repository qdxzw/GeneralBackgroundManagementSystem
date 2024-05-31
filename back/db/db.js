var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'express_management_system'
})
connection.connect(err => {
  if (err) {
    console.error('数据库连接失败:', err)
    return
  }
  console.log('数据库连接成功')
})
module.exports = connection
