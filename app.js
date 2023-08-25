const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const port = 3000


app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// 傳入靜態網頁
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurant')
})

app.get('/restaurant', (req, res) => {
  res.render('index')
})

app.get('/restaurant/:id', (req, res) => {
  //req.params.id拿來取得你輸入的id，ex: http://localhost:3000/restaurant/5 -> 就會顯示5
  const id = req.params.id
  res.send(`read restaurant: ${id}`)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})