const authHash = require('../controller/auth/hash.json')
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: '[ Token não informado ]' });
    }

    /* para receber token no formato certo:
    Bearer qskfnijwelkfeffwd6f516rg654g4 */
    const parts = authHeader.split(' ')//tem que ter um espaço 

    if (!parts.length === 2) { // verificando Se  TOKEN tem 2 partes
        return res.status(401).send({ error: ' [ Erro com o Token ] ' })
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ erro: ' Token mal formatado ' })
    }

    jwt.verify(token, authHash.secret, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token invalido' })

        req.userId = decoded.id;

        return next()
    })
}