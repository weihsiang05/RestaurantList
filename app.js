const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const port = 3000
//const restaurant = require('./public/jsons/restaurant.json').results
const db = require('./models')
const restaurant = require('./models/restaurant')
const Restaurant = db.Restaurant
const methodOverride = require('method-override')

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// 傳入靜態網頁
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
//'_method' can change different text you want
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.redirect('/restaurant')
})

app.get('/restaurant', (req, res) => {
  return Restaurant.findAll({
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
    .then((restaurant) => {
      res.render('index', { restaurant })
    })
    .catch((err) => {
      res.status(422).json(err)
    })
})

app.get('/restaurant/new', (req, res) => {
  res.render('new')
})

app.post('/restaurant', (req, res) => {
  const restaurant = req.body

  return Restaurant.create({
    name: restaurant.name,
    name_en: restaurant.englishName,
    category: restaurant.category,
    image: restaurant.imageUrl,
    location: restaurant.location,
    phone: restaurant.phone,
    google_map: restaurant.googleMapUrl,
    rating: restaurant.rating,
    description: restaurant.description
  })
    .then(() => {
      res.redirect('/restaurant')
    })
    .catch((err) => {
      console.log(err)
    })
})

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
    .then((rest) => {
      res.render('details', { rest })
    })
    .catch((err) => {
      console.log(err)
    })
})

app.get('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
    .then((rest) => {
      res.render('edit', { rest })
    })
    .catch((err) => {
      console.log(err)
    })
})

app.put('/restaurant/:id', (req, res) => {
  const restaurant = req.body
  const id = req.params.id

  return Restaurant.update({
    name: restaurant.name,
    name_en: restaurant.englishName,
    category: restaurant.category,
    image: restaurant.imageUrl,
    location: restaurant.location,
    phone: restaurant.phone,
    google_map: restaurant.googleMapUrl,
    rating: restaurant.rating,
    description: restaurant.description
  }, {
    where: {
      id
    }
  })
    .then(() => {
      res.redirect(`/restaurant`)
    })
})

app.delete('/restaurant/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.destroy({
    where: {
      id
    }
  })
    .then(() => {
      res.redirect('/restaurant')
    })
})

// app.get('/restaurant', (req, res) => {
//   //keyword為<input></input>中的name="keyword"
//   const keywords = req.query.keyword?.trim()
//   const matchedSerach = keywords ? restaurant.filter((rest) => {
//     return Object.values(rest).some((property) => {
//       if (typeof property === 'string') {
//         return property.toLowerCase().includes(keywords.toLowerCase())
//       } else {
//         return false
//       }
//     })
//   }) : restaurant

//   res.render('index', { restaurant: matchedSerach, keywords })
// })

// app.get('/restaurant/:id', (req, res) => {
//   //req.params.id拿來取得你輸入的id，ex: http://localhost:3000/restaurant/5 -> 就會顯示5
//   const id = req.params.id
//   //res.send(`read restaurant: ${id}`)
//   const rest = restaurant.find((r) => {
//     return r.id.toString() === id
//   })

//   res.render('details', { rest })
// })

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})