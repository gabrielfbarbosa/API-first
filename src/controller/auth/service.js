//Recebe o que vem do cliente e trata erros caso houver.(Ex erro: cadastrar mesmo email duas vezes) 
const User = require('./../../config/model/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authHash = require('./hash.json')

const authService = {

    //Cadastro
    async createUser(body) {

        try {
            //caso tente cadastrar email ja cadastrado.
            const emailExist = await User.findOne({ email: body.email });

            if (emailExist) {
                throw new Error(' [EMAIL JA CADASTRADO] ');
            }

            // criptografando a senha 
            body.password = bcrypt.hashSync(body.password, 10)

            //cria cadastro
            const user = await User.create(body);

            user.save();
            return user;

        } catch (error) {
            throw new Error(error);
        }
    },

    //Buscar cadastros
    async allUsers(body) { //retornar usuarios do BD
        try {
            return await User.find()

        } catch (error) {
            throw new Error(error)
        }
    },

    //Deletar cadastro
    async deleteUser(body) { //deletar dados do BD por email
        try {

            const findUser = await User.deleteOne({ _id: body.params.id })
            // .then(result => console.log(`Deleted ${result.deletedCount} item.`))
            // .catch(err => console.error(`Delete failed with error: ${err}`))

            if (!findUser) throw new Error(` [USUARIO NÂO ENCONTRADO] `);

            return await findUser

        } catch (error) {
            throw new Error(error)
        }
    },

    //Atualizar um ou mais dados
    async updadeOneUser( id ,body) {

        try {

            const findUpdate = await User.findByIdAndUpdate(
                {_id: id }, //filter 
                body , 
                //Update
            )

            if (!findUpdate) {
                throw new Error(' [NÃO FOI POSSIVEL ATUALIZAR] ')
            }

            return await findUpdate.save()

        } catch (error) {
            throw new Error(error)
        }
    },

    //Login retornando Token
    async login(body) {

        try {
            const { email, password } = body;

            const user = await User.findOne({ email }) /*.select('+password');*/

            if (!user) {
                throw new Error(' [ Usuario não encontrado ] ');
            }
            //comparando os password encriptados
            const cryp = await bcrypt.compareSync(password, user.password)
            //so funcionou com encriptação feita direto no cadastro
            //o q tem la no Model NÃO deu boa

            if (!cryp) {
                throw new Error(' [ Senha incorreta ] ');
            }

            user.password = undefined; //Para nao voltar a senha

            const token = jwt.sign(
                { id: user.id },
                authHash.secret, //hash md5 criado no google
                { expiresIn: 86400 },
            )

            return ({
                user,
                token
            });

        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = authService