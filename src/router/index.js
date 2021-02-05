const { cadastrar, findAll, deleteUserId, updateUser, autenticate } = require('../controller/auth/index')
const router = require('express').Router()

router.post('/cadastro', cadastrar)

router.get('/consulta', findAll)

router.delete('/cancelar/:email', deleteUserId)

router.put('/atualizar/:id', updateUser )

router.post('/login', autenticate)

module.exports = router