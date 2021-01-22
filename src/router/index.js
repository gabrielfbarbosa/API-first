const { cadastrar, findAll, deleteUserId, updateUser } = require('../controller/auth/index')
const router = require('express').Router()

router.post('/cadastro', cadastrar)

router.get('/consulta', findAll)

router.delete('/cancelar/:email', deleteUserId)

router.put('/atualizar/:email', updateUser )

module.exports = router