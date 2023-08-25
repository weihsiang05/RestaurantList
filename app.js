const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurant')
})

app.get('/restaurant', (req, res) => {
  res.send('list restaurant')
})

app.get('/restaurant/:id', (req, res) => {
  //req.params.id拿來取得你輸入的id，ex: http://localhost:3000/restaurant/5 -> 就會顯示5
  const id = req.params.id
  res.send(`read restaurant: ${id}`)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})