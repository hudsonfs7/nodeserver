const express = require('express')
const { randomUUID } = require('crypto')
const app = express()
const fs = require('fs')
const { error } = require('console')

app.use(express.json())

let products = []
fs.readFile('products.json', 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    products = JSON.parse(data)
  }
})

// POST =>
app.post('/products', (req, res) => {
  const { name, price } = req.body

  const product = {
    name,
    price,
    id: randomUUID()
  }

  products.push(product)
  handleFile()
  return res.json(product)
})

// GET =>
app.get('/products', (req, res) => {
  return res.json(products)
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(product => product.id === id)
  return res.json(product)
})

// PUT =>
app.put('/products/:id', (req, res) => {
  const { id } = req.params
  const { name, price } = req.body

  const productIndex = products.findIndex(product => product.id === id)
  products[productIndex] = {
    ...products[productIndex],
    name,
    price
  }

  handleFile()

  return res.json({ message: 'Produto alterado' })
})

// DELETE =>
app.delete('/products/:id', (req, res) => {
  const { id } = req.params

  const productIndex = products.findIndex(product => product.id === id)

  products.splice(productIndex, 1)
  handleFile()

  return res.json({ message: 'Produto removido' })
})

function handleFile() {
  fs.writeFile('products.json', JSON.stringify(products), err => {
    if (err) {
      console.log(err)
    } else {
      console.log('Produto inserido')
    }
  })
}

app.listen(4002, () => console.log('Nodemon rodando!'))
