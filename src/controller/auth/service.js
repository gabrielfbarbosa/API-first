//Recebe o que vem do cliente e trata erros caso houver.(Ex erro: cadastrar mesmo email duas vezes) 
const User = require('./../../config/model/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authHash = require('./hash.json')

const authService = {

    async createUser(body) {

        try {
            //caso tente cadastrar email ja cadastrado.
            const emailExist = await User.findOne({ email: body.email });

            if (emailExist) {
                throw new Error(' [EMAIL JA CADASTRADO] ');
            }
            //criando cadastro
            const user = await User.create(body);

            user.save();
            return user;

        } catch (error) {
            throw new Error(error);
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
            // const query = { User }
            const findUser = await User.deleteOne({_id: body.params.id})
            // User.deleteOne(findUser) //Deleta do banco, mas aq diz q deletou 0
                .then(result => console.log(`Deleted ${result.deletedCount} item.`))
                .catch(err => console.error(`Delete failed with error: ${err}`))

            if (!findUser) {
                throw new Error(' [USUARIO NÃO ENCONTRADO] ')
            }
            return await findUser

        } catch (error) {
            throw new Error(error)
        }
    },

    async updadeOneUser(body) {

        try {

            const findUpdate = await User.updateOne(
                { _id: body.params.id }, //filter 
                findUpdate.cpf = req.body.cpf , //Update
            )

            if (!findUpdate) {
                throw new Error(' [NÃO FOI POSSIVEL ATUALIZAR] ')
            }

            return await findUpdate.save()

        } catch (error) {
            throw new Error(error)
        }
    },

    async login(body) {

        try {
            const { email, password } = body;

            const user = await User.findOne({ email }).select('+password');

            if (!user) {
                throw new Error(' [ Usuario não encontrado ] ');
            }

            if (!await bcrypt.compare(password, user.password)) {
                throw new Error(' [ SENHA INVALIDA ] ');
            }

            user.password = undefined; //Para nao voltar a senha

            const token = jwt.sign(
                { id: user.id },
                authHash.secret, //hash md5 criado no google
                { expiresIn: 86400 },
            )

            return ({ user, token });

        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = authService