//Recebe o que vem do cliente e trata erros caso houver.(Ex erro: cadastrar mesmo email duas vezes) 
const User = require('./../../config/model/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authHash = require('./hash.json')
const { findOne } = require('./../../config/model/index')
const ncrypt = require('ncrypt-js') //TENTAR COM ESSE

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
            // body.password = bcrypt.hashSync(body.password, 10)

            //cria cadastro
            const user = await User.create(body);

            user.save();
            return await user;

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

            const userExist = await User.findOne({ _id: body.params.id });
            console.log(userExist)

            if (userExist)

                await User.deleteOne({ _id: body.params.id })
                    .then(result => console.log(`Deleted ${result.deletedCount} item.`))
                    .catch(err => console.error(`Delete failed with error: ${err}`))

            else throw new Error(` [USUARIO NÂO ENCONTRADO] `);

            return await userExist

        } catch (error) {
            throw new Error(error)
        }
    },

    //Atualizar um ou mais dados
    async updadeOneUser(id, body) {

        try {

            const findUpdate = await User.findByIdAndUpdate(
                { _id: id }, //filter 
                body, //Update 
                { new: true } //retorna o cadastro atualizado              
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
            const user = await User.findOne({ email })
            if (!user) {
                throw new Error(' [ Usuario não encontrado ] ');
            }
            // //comparando os password encriptados //so funcionou com encriptação feita direto no cadastro //o q tem la no Model NÃO deu boa
            // const cryp = await bcrypt.compareSync(password, user.password)
            // console.log(cryp)
            // if (!cryp) {
            //     throw new Error(' [ Senha incorreta ] ');
            // }
            //user.password = undefined; //Para nao voltar a senha
            
            const _secretKey = ('1');
            const ncryptObject = new ncrypt(_secretKey)
            const decryptedData = await ncryptObject.decrypt(user.password);

            // console.log("... and then decryption...");
            // console.log("Decipher Text : " + decryptedData);
            // console.log("...done.");

            const token = jwt.sign(
                { id: user.id },
                authHash.secret, //hash md5 criado no google
                { expiresIn: 86400 }, //1 Dia
            )

            return ({
                user,
                token
            });

        } catch (error) {
            throw new Error(error)
        }
    },

    // TENTAR COM Ncrypt: https://www.npmjs.com/package/ncrypt-js
    async Entrar(body) {

        try {

        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = authService