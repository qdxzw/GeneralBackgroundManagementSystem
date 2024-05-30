const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = express('cors')
app.use(cors)
// parse application/x-www-form-urlencoded
// 当extended为false时，值为数组或者字符串，当为true时，值为任意类型
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
