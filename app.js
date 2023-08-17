const express = require('express')
const { randomUUID } = require('crypto')
const app = express()

app.use(express.json())

const products = []

// Post =>
app.post('/products', (req, res) => {
  const { name, price } = req.body

  const product = {
    name,
    price,
    id: randomUUID()
  }

  products.push(product)

  return res.json(product)
})

app.get('/products', (req, res) => {
  return res.json(products)
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(product => product.id === id)
  console.log(product)
  return res.json(product)
})

app.listen(4002, () => console.log('Nodemon rodando!'))
