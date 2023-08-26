const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const port = 3000
const restaurant = require('./public/jasons/restaurant.json').results

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// 傳入靜態網頁
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurant')
})

app.get('/restaurant', (req, res) => {
  //keyword為<input></input>中的name="keyword"
  const keywords = req.query.keyword?.trim()
  const matchedSerach = keywords ? restaurant.filter((rest) => {
    return Object.values(rest).some((property) => {
      if (typeof property === 'string') {
        return property.toLowerCase().includes(keywords.toLowerCase())
      } else {
        return false
      }
    })
  }) : restaurant

  res.render('index', { restaurant: matchedSerach, keywords })
})

app.get('/restaurant/:id', (req, res) => {
  //req.params.id拿來取得你輸入的id，ex: http://localhost:3000/restaurant/5 -> 就會顯示5
  const id = req.params.id
  //res.send(`read restaurant: ${id}`)
  const rest = restaurant.find((r) => {
    return r.id.toString() === id
  })

  res.render('details', { rest })
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})