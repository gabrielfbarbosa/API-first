const mongoose = require('mongoose');
const bcrypt = require('bcryptjs') //nao deu boa 
// const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema ({
    nome: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true,
        select: false
    },
    cpf: {
        type:String,
        required: true
    },
})

//criptografia da senha com hash
userSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

const User = mongoose.model('users', userSchema)

module.exports = User