//Recebe o que vem do cliente e trata erros caso houver.(Ex erro: cadastrar mesmo email duas vezes) 
const User = require('./../../config/model/index')

const authService = {

    async createUser(body) {
        //dados exigidos do cliente
        const { nome, email, password, cpf } = body

        try { //salvar dados recebidos no banco

            const user = new User({
                nome: nome,
                email: email,
                password: password,
                cpf: cpf,
            });
            //caso tente cadastrar email ja cadastrado.
            const emailExist = await User.findOne({ email });

            if (emailExist) {
                throw new Error(' ERRO = [EMAIL JA CADASTRADO] ')
            }
            user.save()
            return user

        } catch (error) {
            throw new Error(error)

        }
    },

    async allUsers(body) { //retornar usuarios do BD
        try {
            return await User.find()

        } catch (error) {
            throw new Error(error)
        }
    },

    async deleteUser(body) { //deletar dados do BD por email
        try {
            const findUser = await User.deleteOne()

            if (!findUser) {
                throw new Error(' [USUARIO NÃO ENCONTRADO] ')
            }
            return await findUser

        } catch (error) {
            throw new Error(error)
        }
    },
    async updadeOneUser(body) { //Update nao saiu nem rezando!!
        try {
            const findUpdate = await User.updateOne(body)

            if (!findUpdate) {
                throw new Error(' [NÃO FOI POSSIVEL ATUALIZAR] ')
            }
            return await findUpdate
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = authService