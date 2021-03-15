const authSrv = require("./service");

//cadastrando
async function cadastrar(req, res) { 
    try {
        const user = await authSrv.createUser(req.body);
        if (user) {
            res.status(200).json(/*'CADASTRADO COM SUCESSO!' +*/ user)
        }
        
    } catch (error) {
        res.status(400).json(error.message)

    }
}

//consulta de cadastrados
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

// Deletar cadastro com id
async function deleteUserId(req, res) { //deletando por id.
    try {
        const delUser = await authSrv.deleteUser(req)

        if (delUser){
            return res.status(200).json( 'Usuario deletado com sucesso: ' )
        }

        // if (!delUser) {return res.status(400).json(' [Usuario não encontrado] ')}

    } catch (error) {
        res.status(400).json(error.message)
    }
}

//Atulaizar um ou mais dados
async function updateUser(req, res) {
    try {
        
        const user = await authSrv.updadeOneUser(req.params.id, req.body)
        
        if (user){
            return res.status(200).json(user)
        }
        
    } catch (error) {
        res.status(400).json(error.message)
        // console.log(error);
    }
}

//Login 
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