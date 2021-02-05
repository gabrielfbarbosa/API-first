const authSrv = require("./service");

async function cadastrar(req, res) { //cadastrando
    try {
        const user = await authSrv.createUser(req.body);
        if (user) {
            res.status(200).json(/*'CADASTRADO COM SUCESSO!' +*/ user)
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
        res.status(400).json(error.message)
    }
}

async function deleteUserId(req, res) { //deletando por email.
    try {
        const user = await authSrv.deleteUser(req)

        if (user){
            return res.status(200).json('Usuario deletado com sucesso!')
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}

async function updateUser(req, res) {
    try {
        
        const user = await authSrv.updadeOneUser(req.body)
        
        if (user){
            return res.status(200).json(user)
        }
        
    } catch (error) {
        res.status(400).json(error.message)
        // console.log(error);
    }
}

async function autenticate(req, res) {
    try {
        const logIn = await authSrv.login(req.body)

        if (logIn){
            res.status(200).json(logIn)
        }

    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = { cadastrar, findAll, deleteUserId, updateUser, autenticate }