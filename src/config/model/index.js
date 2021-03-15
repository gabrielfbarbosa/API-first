const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs') não consegui desenroalr com esse kkkkk
const ncrypt = require("ncrypt-js");

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
        // select: false
    },
    cpf: {
        type: String,
        required: true
    },
},
{
    timestamps: true
})

const _secretKey = ('1');//pode ser qualquer string

const ncryptObject = new ncrypt(_secretKey);

// criptografando dados
userSchema.pre("save", async function (next) {

    const encryptedData = await ncryptObject.encrypt(this.password);
    // console.log("Encryption process...");
    // console.log("Plain Text   : " + this.password);
    // console.log("Cipher Text  : " + encryptedData);

    this.password = encryptedData

    next()
});

const User = mongoose.model('users', userSchema)

module.exports = User