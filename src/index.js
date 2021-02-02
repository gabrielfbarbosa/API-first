//importando
require('./config/connection') //para conectar ao BD
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const PORT = 3023 //portar para acesso

const app = express() //utilizando a extensao no projeto
app.use(bodyParser.json({ urlencoded: true }))

app.use(router) //ligação com as rotas

app.listen(PORT, () => {  //identificação da porta em que o servidor esta rodando
    console.log( ` - Backend ruinning in port ${PORT}`  )
})

app.get('/', (req, res) => { //evitar o "cannot GET /"
    res.send({ " API " : " v0.1 " }).json
})
