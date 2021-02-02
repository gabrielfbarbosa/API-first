const authSrv = require("./service");

async function cadastrar(req, res) { //cadastrando
    try {
        const user = await authSrv.createUser(req.body);
        if (user) {
            res.status(200).json('CADASTRADO COM SUCESSO!')
        }
        
    } catch (error) {
        res.status(400).json(error.message)

    }
}

async function findAll(req, res) { //encontrando todos os cadastros 
    try {
        const users = await authSrv.allUsers()
        if (users) {
            res.status(200).json(users)
        }
    } catch (error) {
        res.status(400).json(message.error)
    }
}

async function deleteUserId(req, res) { //deletando por email.
    try {
        const user = await authSrv.deleteUser(req.email)

        if (user){
            return res.status(200).json('Usuario deletado com sucesso!')
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

async function updateUser(req, res) {
    try {
        const user = await authSrv.updadeOneUser(req.email)
        if (user){
            return res.status(200).json(user)
        }
        console.log(user)
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
}

module.exports = { cadastrar, findAll, deleteUserId, updateUser }