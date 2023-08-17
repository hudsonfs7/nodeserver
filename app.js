const express = require('express')

const app = express()

app.get('/primeira-rota', (req, res) => {
  return res.json({
    message: 'Primeira Rota do express'
  })
})
app.listen(4002, () => console.log('Nodemon rodando!'))
