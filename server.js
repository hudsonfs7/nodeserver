const http = require('http')

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })

    //Primeira condição

    if (req.url === '/produto') {
      res.end(
        JSON.stringify({
          message: 'Produto em foco'
        })
      )
    } else if (req.url === '/clientes') {
      res.end(
        JSON.stringify({
          message: 'Clientes em foco'
        })
      )
    } else {
      res.end(
        JSON.stringify({
          message: 'URL Padrão'
        })
      )
    }

    // Fim das condições
  })
  .listen(4001, () => console.log('Rodando'))
